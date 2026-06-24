import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../youtubeApi';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../mockData';

export default function SearchResults() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const { searchTerm } = useParams();

  useEffect(() => {
    console.log("Fetching data from API for keyword:", searchTerm);
    setLoading(true);
    setIsFallback(false);

    fetchFromAPI(`search?q=${searchTerm}&part=snippet,id&maxResults=50`)
      .then((data) => {
        if (!data || !data.items || data.items.length === 0) {
          throw new Error("No data or empty items");
        }

        // Filter out items that are not videos or playlists with valid IDs
        const videoList = data.items.filter(item => item?.id?.videoId || item?.id?.playlistId || item?.id);
        setVideos(videoList);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Search fetch failed, using mock data fallback:", err);
        // Fallback: search our local mockVideos for matches, or just show all mockVideos
        const term = searchTerm.toLowerCase();
        const filteredMock = mockVideos.filter(v => 
          v.title.toLowerCase().includes(term) || 
          v.channelTitle.toLowerCase().includes(term) ||
          v.description.toLowerCase().includes(term)
        );
        setVideos(filteredMock.length > 0 ? filteredMock : mockVideos);
        setIsFallback(true);
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <div style={{ padding: '24px', minHeight: '92vh', background: '#121212', color: 'white' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
        Search Results for: <span style={{ color: '#ff0000' }}>"{searchTerm}"</span>
      </h2>

      {isFallback && (
        <p style={{ color: '#ff9800', marginBottom: '16px', fontSize: '14px' }}>
          ⚠️ API request limit reached. Showing offline matching results.
        </p>
      )}
      
      {loading ? (
        <p style={{ color: '#aaa' }}>Loading videos from YouTube API...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {videos.map((item, index) => {
            const uniqueKey = item?.id?.videoId || item?.id?.playlistId || item?.id || index;
            return <VideoCard key={uniqueKey} video={item} />;
          })}
        </div>
      )}
    </div>
  );
}