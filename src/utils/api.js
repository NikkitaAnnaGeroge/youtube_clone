import {
  videos as mockVideos,
  channels as mockChannels,
  queryVideos as mockQueryVideos,
  getVideosByCategory as mockGetVideosByCategory,
  getVideosByChannel as mockGetVideosByChannel,
  getVideoById as mockGetVideoById
} from "./videoData";

// Robust fallback list of CORS-enabled public Invidious instances
const DEFAULT_INSTANCES = [
  "https://yewtu.be",
  "https://invidious.nerdvpn.de",
  "https://invidious.privacydev.net",
  "https://invidious.projectsegfau.lt",
  "https://invidious.lunar.icu",
  "https://inv.tux.im",
  "https://invidious.flokinet.to",
  "https://iv.melmac.space"
];

let instancesList = [...DEFAULT_INSTANCES];
let currentInstanceIndex = 0;
let instancesLoaded = false;

// Try to load dynamic instances from the official Invidious directory
const loadInstances = async () => {
  if (instancesLoaded) return;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch("https://api.invidious.io/instances.json", {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      // Filter for active instances with API enabled and HTTPS
      const active = data
        .filter(item => {
          const stats = item[1];
          return stats && stats.type === "https" && stats.monitor && stats.monitor.status === "1" && stats.api;
        })
        .map(item => item[1].uri || `https://${item[0]}`)
        .filter(url => url.startsWith("https"));
        
      if (active.length > 0) {
        instancesList = active;
        // Start from a random working instance to distribute load
        currentInstanceIndex = Math.floor(Math.random() * instancesList.length);
      }
    }
  } catch (error) {
    console.warn("Could not load dynamic Invidious instances list, using default list:", error);
  } finally {
    instancesLoaded = true;
  }
};

// Helper function to format duration from seconds (e.g. 212 -> "3:32")
const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Helper function to format view counts
const formatViews = (viewsCount) => {
  if (!viewsCount) return "0 views";
  if (viewsCount >= 1000000) {
    return `${(viewsCount / 1000000).toFixed(1)}M views`;
  }
  if (viewsCount >= 1000) {
    return `${(viewsCount / 1000).toFixed(0)}K views`;
  }
  return `${viewsCount} views`;
};

// Helper to fetch from Invidious with timeout and automatic failover
const fetchFromInvidious = async (endpoint, params = {}) => {
  await loadInstances();
  
  const originalIndex = currentInstanceIndex;
  let attempts = 0;
  
  while (attempts < instancesList.length) {
    const activeIndex = (currentInstanceIndex + attempts) % instancesList.length;
    const baseUrl = instancesList[activeIndex];
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout per request
      
      const queryParams = new URLSearchParams(params).toString();
      const url = `${baseUrl}${endpoint}${queryParams ? `?${queryParams}` : ""}`;
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        // Update our main pointer to this successful instance index
        currentInstanceIndex = activeIndex;
        return await response.json();
      }
      throw new Error(`Status code: ${response.status}`);
    } catch (err) {
      console.warn(`Instance failed: ${baseUrl}${endpoint} - Error:`, err.message || err);
      attempts++;
    }
  }
  
  throw new Error("All Invidious instances failed.");
};

// --- API Methods ---

// 1. Fetch Trending Videos (Home Feed)
export const fetchTrendingVideos = async () => {
  try {
    const data = await fetchFromInvidious("/api/v1/trending", { region: "US", type: "video" });
    if (!Array.isArray(data) || data.length === 0) throw new Error("No data returned");
    
    return data.map(item => ({
      id: item.videoId,
      title: item.title,
      description: item.description || "",
      channelId: item.authorId,
      channelTitle: item.author,
      views: item.viewCountText || formatViews(item.viewCount),
      likes: item.likeCount ? `${(item.likeCount / 1000).toFixed(0)}K` : "1.2K",
      duration: item.lengthSeconds ? formatDuration(item.lengthSeconds) : "10:00",
      publishDate: item.publishedText || "Recently",
      category: "All"
    }));
  } catch (error) {
    console.error("fetchTrendingVideos failed, falling back to mock data:", error);
    return mockVideos;
  }
};

// 2. Search Videos (and category feed filtering)
export const fetchSearchVideos = async (query) => {
  if (!query || query.toLowerCase() === "all") {
    return fetchTrendingVideos();
  }
  try {
    const data = await fetchFromInvidious("/api/v1/search", { q: query, type: "video" });
    if (!Array.isArray(data) || data.length === 0) throw new Error("No search data returned");
    
    return data.map(item => ({
      id: item.videoId,
      title: item.title,
      description: item.description || "",
      channelId: item.authorId,
      channelTitle: item.author,
      views: item.viewCountText || formatViews(item.viewCount),
      likes: item.likeCount ? `${(item.likeCount / 1000).toFixed(0)}K` : "2.4K",
      duration: item.lengthSeconds ? formatDuration(item.lengthSeconds) : "8:00",
      publishDate: item.publishedText || "Recently",
      category: query
    }));
  } catch (error) {
    console.error(`fetchSearchVideos for "${query}" failed, falling back to mock data:`, error);
    // Offline filter
    return mockQueryVideos(query);
  }
};

// 3. Fetch Video Details
export const fetchVideoDetails = async (videoId) => {
  try {
    const data = await fetchFromInvidious(`/api/v1/videos/${videoId}`);
    if (!data || !data.videoId) throw new Error("Invalid video details response");
    
    return {
      id: data.videoId,
      title: data.title,
      description: data.description || "",
      channelId: data.authorId,
      channelTitle: data.author,
      views: data.viewCountText || formatViews(data.viewCount),
      likes: data.likeCount ? `${(data.likeCount / 1000).toFixed(0)}K` : "4.5K",
      duration: data.lengthSeconds ? formatDuration(data.lengthSeconds) : "15:00",
      publishDate: data.publishedText || "Recently",
      category: data.keywords?.[0] || "All"
    };
  } catch (error) {
    console.error(`fetchVideoDetails for "${videoId}" failed, falling back to mock data:`, error);
    return mockGetVideoById(videoId);
  }
};

// 4. Fetch Channel Details
export const fetchChannelDetails = async (channelId) => {
  // If it's a mock channel, keep using it
  if (mockChannels[channelId]) {
    return mockChannels[channelId];
  }
  
  try {
    const data = await fetchFromInvidious(`/api/v1/channels/${channelId}`);
    if (!data || !data.author) throw new Error("Invalid channel details response");
    
    // Choose best avatar image URL
    const avatar = data.authorThumbnails?.[data.authorThumbnails.length - 1]?.url || 
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.author)}`;
      
    // Choose banner URL or fallback
    const banner = data.bannerUrl || 
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80";
      
    return {
      id: data.authorId || channelId,
      title: data.author,
      avatar: avatar.startsWith("//") ? `https:${avatar}` : avatar,
      banner: banner,
      subscribers: data.subCountText || `${(data.subCount / 1000).toFixed(0)}K subscribers`,
      videosCount: `${data.videoCount || 0} videos`,
      description: data.description || `Welcome to the official channel of ${data.author}.`
    };
  } catch (error) {
    console.error(`fetchChannelDetails for "${channelId}" failed, creating mock fallback:`, error);
    // Generic channel details fallback
    return {
      id: channelId,
      title: channelId.length > 15 ? "YouTube Channel" : channelId,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(channelId)}&backgroundColor=0284c7`,
      banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      subscribers: "1.5M subscribers",
      videosCount: "120 videos",
      description: "Channel details could not be loaded from API, showing offline fallback info."
    };
  }
};

// 5. Fetch Channel Videos
export const fetchChannelVideos = async (channelId) => {
  try {
    const data = await fetchFromInvidious(`/api/v1/channels/${channelId}/videos`);
    
    let videoList = [];
    if (data && Array.isArray(data.videos)) {
      videoList = data.videos;
    } else if (Array.isArray(data)) {
      videoList = data;
    } else {
      throw new Error("Invalid channel videos response");
    }
    
    return videoList.map(item => ({
      id: item.videoId,
      title: item.title,
      description: item.description || "",
      channelId: channelId,
      channelTitle: item.author || "Channel",
      views: item.viewCountText || formatViews(item.viewCount),
      likes: item.likeCount ? `${(item.likeCount / 1000).toFixed(0)}K` : "1.8K",
      duration: item.lengthSeconds ? formatDuration(item.lengthSeconds) : "12:00",
      publishDate: item.publishedText || "Recently",
      category: "All"
    }));
  } catch (error) {
    console.error(`fetchChannelVideos for "${channelId}" failed, falling back to mock videos:`, error);
    const mockChanVids = mockGetVideosByChannel(channelId);
    return mockChanVids.length > 0 ? mockChanVids : mockVideos.slice(0, 4);
  }
};
