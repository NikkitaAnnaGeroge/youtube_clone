import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box, Avatar, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { channels } from "../utils/videoData";

const VideoCard = ({ video }) => {
  const channelInfo = channels[video.channelId];
  const avatarUrl = channelInfo ? channelInfo.avatar : "";

  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: "none",
        borderRadius: "12px",
        backgroundColor: "transparent",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          "& .thumbnail-overlay": {
            opacity: 1
          }
        }
      }}
    >
      {/* Thumbnail Link */}
      <Link to={`/video/${video.id}`} style={{ textDecoration: "none", position: "relative", display: "block" }}>
        <Box sx={{ position: "relative", width: "100%", pt: "56.25%", borderRadius: "12px", overflow: "hidden" }}>
          <CardMedia
            component="img"
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&auto=format&fit=crop&q=80";
            }}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
          {/* Duration Badge */}
          <Box
            sx={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              px: "6px",
              py: "2px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold"
            }}
          >
            {video.duration}
          </Box>
        </Box>
      </Link>

      {/* Content Section */}
      <CardContent sx={{ px: 0.5, py: 1.5, display: "flex", gap: "12px", "&:last-child": { pb: 1 } }}>
        {/* Channel Avatar */}
        <Link to={`/channel/${video.channelId}`}>
          <Avatar src={avatarUrl} sx={{ width: 36, height: 36 }} />
        </Link>

        {/* Video Title and Metadata */}
        <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
          <Link to={`/video/${video.id}`} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="#fff"
              sx={{
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontSize: "15px",
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {video.title}
            </Typography>
          </Link>

          {/* Channel Name */}
          <Link to={`/channel/${video.channelId}`} style={{ textDecoration: "none", display: "inline-flex" }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography
                variant="body2"
                color="#aaa"
                sx={{
                  "&:hover": { color: "#fff" },
                  fontSize: "13px"
                }}
              >
                {video.channelTitle}
              </Typography>
              <CheckCircle sx={{ fontSize: "14px", color: "gray" }} />
            </Stack>
          </Link>

          {/* Views & Date */}
          <Typography variant="body2" color="#aaa" sx={{ fontSize: "13px" }}>
            {video.views} • {video.publishDate}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
