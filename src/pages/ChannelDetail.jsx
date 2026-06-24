import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography, Avatar, Button, Tabs, Tab, Grid, Skeleton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { fetchChannelDetails, fetchChannelVideos } from "../utils/api";
import VideoCard from "../components/VideoCard";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setChannel(null);
    setChannelVideos([]);
    
    const loadChannelData = async () => {
      try {
        const channelData = await fetchChannelDetails(id);
        if (!active) return;
        setChannel(channelData);
        
        const videosData = await fetchChannelVideos(id);
        if (!active) return;
        setChannelVideos(videosData);
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading channel data:", err);
        if (active) setLoading(false);
      }
    };
    
    loadChannelData();
    
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Box minHeight="95vh" sx={{ backgroundColor: "#0f0f0f", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h5" color="#fff">Loading channel details...</Typography>
      </Box>
    );
  }

  if (!channel) {
    return (
      <Box minHeight="95vh" sx={{ backgroundColor: "#0f0f0f", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h5" color="#fff">Channel not found...</Typography>
      </Box>
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box minHeight="95vh" sx={{ backgroundColor: "#0f0f0f", color: "#fff", pb: 5 }}>
      {/* Channel Banner */}
      <Box
        sx={{
          height: { xs: "120px", sm: "200px", md: "250px" },
          width: "100%",
          backgroundImage: `url(${channel.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#222"
        }}
      />

      {/* Channel Main Info */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        alignItems={{ xs: "center", sm: "flex-start" }}
        sx={{
          px: { xs: 2, md: 8 },
          py: 3,
          textAlign: { xs: "center", sm: "left" }
        }}
      >
        <Avatar
          src={channel.avatar}
          sx={{
            width: { xs: 80, sm: 120, md: 140 },
            height: { xs: 80, sm: 120, md: 140 },
            border: "2px solid #333",
            boxShadow: "0 4px 10px rgba(0,0,0,0.5)"
          }}
        />

        <Stack spacing={1} sx={{ flex: 1, py: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
            <Typography variant="h4" fontWeight="bold" sx={{ fontFamily: "'Outfit', sans-serif", fontSize: { xs: "24px", md: "32px" } }}>
              {channel.title}
            </Typography>
            <CheckCircle sx={{ fontSize: "20px", color: "gray" }} />
          </Stack>

          <Typography variant="body2" color="#aaa" sx={{ fontSize: "14px" }}>
            @{channel.id} • {channel.subscribers} • {channel.videosCount}
          </Typography>

          <Typography
            variant="body2"
            color="#ddd"
            sx={{
              maxWidth: "600px",
              fontSize: "14px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {channel.description}
          </Typography>

          <Box sx={{ pt: 1 }}>
            <Button
              variant="contained"
              onClick={() => setIsSubscribed(!isSubscribed)}
              sx={{
                backgroundColor: isSubscribed ? "#272727" : "#fff",
                color: isSubscribed ? "#fff" : "#0f0f0f",
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                px: 4,
                py: 1,
                "&:hover": {
                  backgroundColor: isSubscribed ? "#3f3f3f" : "#e6e6e6"
                }
              }}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </Box>
        </Stack>
      </Stack>

      {/* Tabs Menu */}
      <Box sx={{ borderBottom: "1px solid #272727", px: { xs: 2, md: 8 } }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#fff"
            },
            "& .MuiTab-root": {
              color: "#aaa",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "15px",
              minWidth: 80,
              mr: 2,
              "&.Mui-selected": {
                color: "#fff"
              }
            }
          }}
        >
          <Tab label="Home" />
          <Tab label="Videos" />
          <Tab label="Playlists" />
          <Tab label="About" />
        </Tabs>
      </Box>

      {/* Tab Panel Contents */}
      <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Featured Content
            </Typography>
            <Grid container spacing={3}>
              {channelVideos.slice(0, 4).map((video) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                  <VideoCard video={video} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {channelVideos.map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 2 && (
          <Typography variant="body1" color="#aaa" align="center" sx={{ py: 6 }}>
            This channel has no playlists created.
          </Typography>
        )}

        {activeTab === 3 && (
          <Box sx={{ maxWidth: "800px", mx: "auto", py: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              About {channel.title}
            </Typography>
            <Typography variant="body1" sx={{ color: "#ddd", lineHeight: 1.8, mb: 4 }}>
              {channel.description}
            </Typography>
            <Typography variant="subtitle2" color="#aaa">
              Details
            </Typography>
            <Divider sx={{ my: 1, backgroundColor: "#333" }} />
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Typography variant="body2" color="#aaa">
                Location: United States
              </Typography>
              <Typography variant="body2" color="#aaa">
                Joined: Oct 22, 2014
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
