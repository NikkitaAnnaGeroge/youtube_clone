import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Stack, Typography, Avatar, Button, TextField, Divider, Paper, Skeleton } from "@mui/material";
import { ThumbUp, ThumbDown, CheckCircle, Send } from "@mui/icons-material";
import { getCommentsForVideo, addCommentToVideo } from "../utils/videoData";
import { fetchVideoDetails, fetchChannelDetails, fetchSearchVideos } from "../utils/api";
import VideoCard from "../components/VideoCard";

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [channelInfo, setChannelInfo] = useState(null);

  useEffect(() => {
    let active = true;
    setVideo(null);
    setChannelInfo(null);
    setRecommendedVideos([]);
    
    const loadData = async () => {
      try {
        const videoDetail = await fetchVideoDetails(id);
        if (!active) return;
        setVideo(videoDetail);
        
        if (videoDetail) {
          setComments(getCommentsForVideo(id));
          setIsSubscribed(false);
          setIsLiked(false);
          
          const numericLikes = parseInt(videoDetail.likes.replace(/[^0-9]/g, "")) || 100;
          setLikeCount(numericLikes);
          
          // Fetch channel info
          if (videoDetail.channelId) {
            fetchChannelDetails(videoDetail.channelId)
              .then(channelData => {
                if (active) setChannelInfo(channelData);
              })
              .catch(err => console.error("Error fetching channel details:", err));
          }
          
          // Fetch recommended videos
          const query = videoDetail.category || videoDetail.title.split(" ").slice(0, 2).join(" ") || "coding";
          fetchSearchVideos(query)
            .then(recommendations => {
              if (active) {
                const filtered = recommendations.filter(v => v.id !== id);
                setRecommendedVideos(filtered.slice(0, 10));
              }
            })
            .catch(err => console.error("Error fetching recommendations:", err));
        }
      } catch (error) {
        console.error("Error loading video details page data:", error);
      }
    };
    
    loadData();
    window.scrollTo(0, 0);
    
    return () => {
      active = false;
    };
  }, [id]);

  if (!video) {
    return (
      <Box minHeight="95vh" sx={{ backgroundColor: "#0f0f0f", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h5" color="#fff">Loading video details...</Typography>
      </Box>
    );
  }

  const handleSubscribeToggle = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const updatedComments = addCommentToVideo(id, commentText.trim(), "You");
      setComments(updatedComments);
      setCommentText("");
    }
  };

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: "#0f0f0f", color: "#fff", p: { xs: 1, md: 3 }, overflowY: "auto" }}>
      <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
        {/* Left Side: Video Player, Metadata, Comments */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Responsive Video Player wrapper */}
          <Box sx={{ width: "100%", pt: "56.25%", position: "relative", borderRadius: "12px", overflow: "hidden", backgroundColor: "#000" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </Box>

          {/* Video Title */}
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2.5, mb: 2, fontFamily: "'Outfit', sans-serif", fontSize: { xs: "18px", md: "24px" } }}>
            {video.title}
          </Typography>

          {/* Channel Info & Actions (Like, Share, Subscribe) */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            {/* Channel Avatar & Subscribers */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Link to={`/channel/${video.channelId}`}>
                <Avatar src={channelInfo?.avatar} sx={{ width: 44, height: 44 }} />
              </Link>
              <Box>
                <Link to={`/channel/${video.channelId}`} style={{ textDecoration: "none", color: "#fff" }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: "16px" }}>
                      {video.channelTitle}
                    </Typography>
                    <CheckCircle sx={{ fontSize: "14px", color: "gray" }} />
                  </Stack>
                </Link>
                <Typography variant="body2" color="#aaa" sx={{ fontSize: "12px" }}>
                  {channelInfo?.subscribers || "1.2M subscribers"}
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={handleSubscribeToggle}
                sx={{
                  ml: 2,
                  backgroundColor: isSubscribed ? "#272727" : "#fff",
                  color: isSubscribed ? "#fff" : "#0f0f0f",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  "&:hover": {
                    backgroundColor: isSubscribed ? "#3f3f3f" : "#e6e6e6"
                  }
                }}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </Stack>

            {/* Like/Dislike Buttons */}
            <Stack direction="row" spacing={1} sx={{ alignSelf: { xs: "stretch", sm: "auto" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#272727",
                  borderRadius: "20px",
                  overflow: "hidden"
                }}
              >
                <Button
                  onClick={handleLikeToggle}
                  startIcon={<ThumbUp sx={{ color: isLiked ? "#3b82f6" : "#fff" }} />}
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                    px: 2,
                    py: 1,
                    minWidth: 0,
                    borderRadius: 0,
                    "&:hover": { backgroundColor: "#3f3f3f" }
                  }}
                >
                  {likeCount}K
                </Button>
                <Divider orientation="vertical" flexItem sx={{ backgroundColor: "#444" }} />
                <Button
                  sx={{
                    color: "#fff",
                    px: 1.5,
                    py: 1,
                    minWidth: 0,
                    borderRadius: 0,
                    "&:hover": { backgroundColor: "#3f3f3f" }
                  }}
                >
                  <ThumbDown sx={{ fontSize: "18px" }} />
                </Button>
              </Box>
            </Stack>
          </Stack>

          {/* Description Block */}
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#272727",
              p: 2,
              borderRadius: "12px",
              mb: 4
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: "#fff" }}>
              {video.views} • {video.publishDate}
            </Typography>
            <Typography
              variant="body2"
              color="#ddd"
              sx={{
                whiteSpace: "pre-wrap",
                fontSize: "14px",
                lineHeight: "1.6"
              }}
            >
              {video.description}
            </Typography>
          </Paper>

          {/* Interactive Comments Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              {comments.length} Comments
            </Typography>

            {/* Add Comment Input Form */}
            <Box component="form" onSubmit={handleCommentSubmit} sx={{ width: "100%", mb: 4 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar src="https://api.dicebear.com/7.x/initials/svg?seed=Nikki&backgroundColor=f43f5e" sx={{ width: 40, height: 40 }} />
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <TextField
                    placeholder="Add a comment..."
                    variant="standard"
                    fullWidth
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    sx={{
                      input: { color: "#fff" },
                      "& .MuiInput-underline:before": { borderBottomColor: "#444" },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#888" },
                      "& .MuiInput-underline:after": { borderBottomColor: "#fff" }
                    }}
                  />
                  {commentText.trim() && (
                    <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ mt: 1 }}>
                      <Button onClick={() => setCommentText("")} sx={{ color: "#fff", textTransform: "none", borderRadius: "18px" }}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        endIcon={<Send />}
                        sx={{
                          backgroundColor: "#fff",
                          color: "#0f0f0f",
                          textTransform: "none",
                          borderRadius: "18px",
                          fontWeight: "bold",
                          "&:hover": { backgroundColor: "#ccc" }
                        }}
                      >
                        Comment
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Box>

            {/* Render Comments List */}
            <Stack spacing={3}>
              {comments.map((comment) => (
                <Stack key={comment.id} direction="row" spacing={2} alignItems="flex-start">
                  <Avatar src={comment.avatar} sx={{ width: 36, height: 36 }} />
                  <Box>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: "13px" }}>
                        {comment.author}
                      </Typography>
                      <Typography variant="caption" color="#aaa" sx={{ fontSize: "11px" }}>
                        {comment.publishedAt}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontSize: "14px", color: "#ddd", lineHeight: "1.4" }}>
                      {comment.text}
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ mt: 1, color: "#aaa" }} alignItems="center">
                      <Button size="small" startIcon={<ThumbUp sx={{ fontSize: "14px" }} />} sx={{ color: "#aaa", fontSize: "12px", textTransform: "none" }}>
                        {comment.likes}
                      </Button>
                      <Button size="small" startIcon={<ThumbDown sx={{ fontSize: "14px" }} />} sx={{ color: "#aaa", fontSize: "12px", textTransform: "none" }}>
                        Reply
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Right Side: Recommended Videos list */}
        <Box sx={{ width: { xs: "100%", lg: "380px" }, flexShrink: 0 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, fontSize: "16px" }}>
            Recommended Videos
          </Typography>
          <Stack spacing={2.5}>
            {recommendedVideos.map((videoItem) => (
              <VideoCard key={videoItem.id} video={videoItem} />
            ))}
            {recommendedVideos.length === 0 && (
              <Typography variant="body2" color="#aaa">
                No recommended videos.
              </Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
