import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Grid, Chip } from "@mui/material";
import { getVideosByCategory, categories } from "../utils/videoData";
import VideoCard from "../components/VideoCard";

const Feed = ({ selectedCategory, setSelectedCategory }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(getVideosByCategory(selectedCategory));
  }, [selectedCategory]);

  return (
    <Box sx={{ flex: 1, p: 2, overflowY: "auto", height: "calc(100vh - 56px)", boxSizing: "border-box" }}>
      {/* Category Pills at the top */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: "auto",
          pb: 2,
          mb: 2,
          "&::-webkit-scrollbar": {
            display: "none" // Hide horizontal scrollbar
          },
          msOverflowStyle: "none", // IE and Edge
          scrollbarWidth: "none" // Firefox
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            sx={{
              backgroundColor: selectedCategory === category ? "#fff" : "#272727",
              color: selectedCategory === category ? "#0f0f0f" : "#fff",
              fontWeight: "600",
              fontSize: "14px",
              px: 0.5,
              py: 2,
              borderRadius: "8px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: selectedCategory === category ? "#fff" : "#3f3f3f",
                color: selectedCategory === category ? "#0f0f0f" : "#fff"
              }
            }}
          />
        ))}
      </Stack>

      {/* Category Header */}
      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
        {selectedCategory === "All" ? "Recommended" : selectedCategory}{" "}
        <span style={{ color: "red" }}>Videos</span>
      </Typography>

      {/* Video Grid */}
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
            <VideoCard video={video} />
          </Grid>
        ))}
        {videos.length === 0 && (
          <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="#aaa">
              No videos found in this category.
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Feed;
