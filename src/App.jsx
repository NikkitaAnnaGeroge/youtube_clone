// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import VideoDetail from './pages/VideoDetail';

// Sub-page feature placeholders
const Shorts = () => (
  <div style={{ padding: '40px', color: '#fff', textAlign: 'center', fontFamily: 'sans-serif' }}>
    <h2>🩳 Shorts Feed</h2>
    <p style={{ color: '#aaa' }}>Short vertical video compilation platform under construction.</p>
  </div>
);

const Subscriptions = () => (
  <div style={{ padding: '40px', color: '#fff', textAlign: 'center', fontFamily: 'sans-serif' }}>
    <h2>🔔 Subscriptions</h2>
    <p style={{ color: '#aaa' }}>Latest updates from your favorite content creators.</p>
  </div>
);

const Library = () => (
  <div style={{ padding: '40px', color: '#fff', textAlign: 'center', fontFamily: 'sans-serif' }}>
    <h2>📁 Your Library</h2>
    <p style={{ color: '#aaa' }}>Your playlists, saved watch-later videos, and collections.</p>
  </div>
);

const History = () => (
  <div style={{ padding: '40px', color: '#fff', textAlign: 'center', fontFamily: 'sans-serif' }}>
    <h2>📜 Watch History</h2>
    <p style={{ color: '#aaa' }}>A chronological timeline tracking videos you have recently played.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app" style={{ backgroundColor: '#0f0f0f', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        
        {/* Main Side-by-Side Flex Layout */}
        <div className="main-layout" style={{ display: 'flex', flex: 1, width: '100%' }}>
          <Sidebar />
          
          <main style={{ flexGrow: 1, backgroundColor: '#0f0f0f', padding: '20px', boxSizing: 'border-box' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* FIXED: Changed path from :query to :searchTerm to fix the broken titles! */}
              <Route path="/search/:searchTerm" element={<SearchResults />} />
              <Route path="/video/:id" element={<VideoDetail />} />
              
              {/* Sidebar Page Extensions */}
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/library" element={<Library />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

// FIXED: Explicitly added default export to fix the Uncaught SyntaxError crash!
export default App;