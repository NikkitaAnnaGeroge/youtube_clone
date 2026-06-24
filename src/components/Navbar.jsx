import React, { useState, useEffect } from "react";
import { Stack, Box, InputBase, IconButton, Avatar, Tooltip } from "@mui/material";
import { Search, VideoCall, Notifications, Menu, YouTube } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/search/")) {
      const decoded = decodeURIComponent(location.pathname.replace("/search/", ""));
      setSearchTerm(decoded);
    } else {
      setSearchTerm("");
    }
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      sx={{
        position: "sticky",
        background: "#0f0f0f",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid #272727",
        height: "56px",
        boxSizing: "border-box"
      }}
    >
      {/* Left Area: Menu and Logo */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton sx={{ color: "#fff" }} onClick={toggleSidebar}>
          <Menu />
        </IconButton>
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#fff" }}>
          <YouTube sx={{ color: "red", fontSize: 32, mr: 0.5 }} />
          <Box
            component="span"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "'Outfit', 'Roboto', sans-serif",
              letterSpacing: "-0.5px",
              display: { xs: "none", sm: "inline" }
            }}
          >
            YouTube
          </Box>
        </Link>
      </Stack>

      {/* Middle Area: Search Bar */}
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#121212",
          border: "1px solid #303030",
          borderRadius: "40px",
          width: { xs: "200px", sm: "400px", md: "500px" },
          pl: 2,
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
          transition: "border-color 0.2s",
          "&:hover, &:focus-within": {
            borderColor: "#1c62b9"
          }
        }}
      >
        <InputBase
          placeholder="Search studies, coding..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            color: "#fff",
            flex: 1,
            fontSize: "14px"
          }}
        />
        <IconButton
          type="submit"
          sx={{
            p: "10px",
            color: "#fff",
            backgroundColor: "#222",
            borderTopRightRadius: "40px",
            borderBottomRightRadius: "40px",
            borderLeft: "1px solid #303030",
            "&:hover": {
              backgroundColor: "#333"
            }
          }}
          aria-label="search"
        >
          <Search />
        </IconButton>
      </Box>

      {/* Right Area: Action Icons & Profile */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Tooltip title="Create">
          <IconButton sx={{ color: "#fff", display: { xs: "none", md: "inline-flex" } }}>
            <VideoCall />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton sx={{ color: "#fff", display: { xs: "none", md: "inline-flex" } }}>
            <Notifications />
          </IconButton>
        </Tooltip>
        <Tooltip title="User Profile">
          <Avatar
            src="https://api.dicebear.com/7.x/initials/svg?seed=Nikki&backgroundColor=f43f5e"
            sx={{
              width: 32,
              height: 32,
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)"
              }
            }}
          />
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Navbar;
