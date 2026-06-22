import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import { queryVideos } from "../utils/videoData";
import VideoCard from "../components/VideoCard";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(queryVideos(searchTerm));
  }, [searchTerm]);

  return (
    <Box sx={{ flex: 1, p: 2, overflowY: "auto", height: "calc(100vh - 56px)", boxSizing: "border-box" }}>
      {/* Search Header */}
      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
        Search Results for: <span style={{ color: "red" }}>{searchTerm}</span>
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
              No results found. Try searching for "coding", "physics", or "react".
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default SearchFeed;
