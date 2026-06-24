import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { fetchSearchVideos } from "../utils/api";
import VideoCard from "../components/VideoCard";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSearchVideos(searchTerm)
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <Box sx={{ flex: 1, p: 2, overflowY: "auto", height: "calc(100vh - 56px)", boxSizing: "border-box" }}>
      {/* Search Header */}
      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
        Search Results for: <span style={{ color: "red" }}>{searchTerm}</span>
      </Typography>

      {/* Video Grid */}
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`search-skeleton-${index}`}>
                <Box sx={{ width: "100%", mb: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={180} sx={{ borderRadius: "12px", backgroundColor: "#1e1e1e" }} />
                  <Box sx={{ pt: 1.5, display: "flex", gap: "12px" }}>
                    <Skeleton variant="circular" width={36} height={36} sx={{ backgroundColor: "#1e1e1e" }} />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton width="85%" height={20} sx={{ backgroundColor: "#1e1e1e", mb: 0.5 }} />
                      <Skeleton width="60%" height={15} sx={{ backgroundColor: "#1e1e1e" }} />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))
          : videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                <VideoCard video={video} />
              </Grid>
            ))}

        {!loading && videos.length === 0 && (
          <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="#aaa">
              No results found. Try searching for something else.
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default SearchFeed;
