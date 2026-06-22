import React from "react";
import { Stack, Button, Box, Typography } from "@mui/material";
import {
  Home,
  Code,
  DeveloperMode,
  Terminal,
  Psychology,
  Science,
  Functions,
  Hub,
  History,
  WatchLater,
  ThumbUp
} from "@mui/icons-material";

const categoryIcons = {
  All: <Home />,
  Coding: <Code />,
  React: <DeveloperMode />,
  JavaScript: <Code />,
  Python: <Terminal />,
  Algorithms: <Psychology />,
  Physics: <Science />,
  Mathematics: <Functions />,
  Science: <Hub />
};

const Sidebar = ({ selectedCategory, setSelectedCategory, sidebarOpen }) => {
  return (
    <Stack
      direction="column"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "calc(100vh - 56px)" },
        width: sidebarOpen ? { xs: "70px", md: "240px" } : "0px",
        flexShrink: 0,
        backgroundColor: "#0f0f0f",
        borderRight: sidebarOpen ? "1px solid #272727" : "none",
        transition: "width 0.2s, border 0.2s",
        py: 1,
        "&::-webkit-scrollbar": {
          width: "6px"
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#3e3e3e",
          borderRadius: "10px"
        },
        display: sidebarOpen ? "flex" : "none"
      }}
    >
      {/* Category List */}
      <Box sx={{ px: 1, mb: 2 }}>
        {Object.entries(categoryIcons).map(([name, icon]) => {
          const isSelected = name === selectedCategory;
          return (
            <Button
              key={name}
              onClick={() => setSelectedCategory(name)}
              sx={{
                width: "100%",
                justifyContent: sidebarOpen ? { xs: "center", md: "flex-start" } : "center",
                alignItems: "center",
                px: { xs: 1, md: 2 },
                py: 1.2,
                my: 0.3,
                borderRadius: "10px",
                textTransform: "none",
                color: isSelected ? "#fff" : "#aaa",
                backgroundColor: isSelected ? "#272727" : "transparent",
                minWidth: 0,
                "&:hover": {
                  backgroundColor: isSelected ? "#3f3f3f" : "#212121",
                  color: "#fff"
                },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 0.5, md: 2 }
              }}
            >
              <span style={{ color: isSelected ? "red" : "#fff", display: "inline-flex", fontSize: "20px" }}>
                {icon}
              </span>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isSelected ? "600" : "400",
                  fontSize: { xs: "10px", md: "14px" },
                  textAlign: "left",
                  display: "block"
                }}
              >
                {name}
              </Typography>
            </Button>
          );
        })}
      </Box>

      {/* Library Section (Divider for Desktop view) */}
      <Box
        sx={{
          borderTop: "1px solid #272727",
          pt: 2,
          px: 1,
          display: { xs: "none", md: "block" }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, pb: 1, color: "#fff", fontWeight: "bold" }}>
          Library
        </Typography>

        <Button
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            px: 2,
            py: 1.2,
            borderRadius: "10px",
            textTransform: "none",
            color: "#aaa",
            "&:hover": { backgroundColor: "#212121", color: "#fff" },
            gap: 2
          }}
        >
          <History sx={{ color: "#fff" }} />
          <Typography variant="body2">History</Typography>
        </Button>

        <Button
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            px: 2,
            py: 1.2,
            borderRadius: "10px",
            textTransform: "none",
            color: "#aaa",
            "&:hover": { backgroundColor: "#212121", color: "#fff" },
            gap: 2
          }}
        >
          <WatchLater sx={{ color: "#fff" }} />
          <Typography variant="body2">Watch Later</Typography>
        </Button>

        <Button
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            px: 2,
            py: 1.2,
            borderRadius: "10px",
            textTransform: "none",
            color: "#aaa",
            "&:hover": { backgroundColor: "#212121", color: "#fff" },
            gap: 2
          }}
        >
          <ThumbUp sx={{ color: "#fff" }} />
          <Typography variant="body2">Liked Videos</Typography>
        </Button>
      </Box>

      {/* Footer Text */}
      <Box sx={{ mt: "auto", px: 3, py: 2, display: { xs: "none", md: "block" } }}>
        <Typography variant="caption" sx={{ color: "#555", display: "block" }}>
          About Press Copyright
        </Typography>
        <Typography variant="caption" sx={{ color: "#555", display: "block", mt: 1 }}>
          © 2026 YouTube LLC
        </Typography>
      </Box>
    </Stack>
  );
};

export default Sidebar;
