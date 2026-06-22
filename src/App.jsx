import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Stack, ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Pages
import Feed from "./pages/Feed";
import VideoDetail from "./pages/VideoDetail";
import ChannelDetail from "./pages/ChannelDetail";
import SearchFeed from "./pages/SearchFeed";

// Custom Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff"
    },
    background: {
      default: "#0f0f0f",
      paper: "#121212"
    },
    text: {
      primary: "#fff",
      secondary: "#aaa"
    }
  },
  typography: {
    fontFamily: "'Outfit', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h5: {
      fontWeight: 700
    },
    subtitle1: {
      fontWeight: 600
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0f0f0f",
          scrollbarColor: "#3e3e3e #0f0f0f",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px"
          },
          "&::-webkit-scrollbar-track": {
            background: "#0f0f0f"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#3e3e3e",
            borderRadius: "4px"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555"
          }
        }
      }
    }
  }
});

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ backgroundColor: "#0f0f0f", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Top Navigation Bar */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Main App Layout (Sidebar + Content) */}
          <Stack direction="row" sx={{ flex: 1, overflow: "hidden" }}>
            <Sidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sidebarOpen={sidebarOpen}
            />
            
            {/* Scrollable Router Views */}
            <Box sx={{ flex: 1, overflow: "hidden" }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Feed selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                  }
                />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/channel/:id" element={<ChannelDetail />} />
                <Route path="/search/:searchTerm" element={<SearchFeed />} />
              </Routes>
            </Box>
          </Stack>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
