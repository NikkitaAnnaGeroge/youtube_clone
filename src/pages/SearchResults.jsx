// src/pages/SearchResults.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../youtubeApi';
import VideoCard from '../components/VideoCard';

export default function SearchResults() {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    // This will print out exactly what word is being searched in your console
    console.log("Fetching data from API for keyword:", searchTerm);

    fetchFromAPI(`search?q=${searchTerm}`)
      .then((data) => {
        console.log("Raw Response Data standard test:", data);
        
        if (!data) return;

        // Extract list regardless of whether the API returns it as .items or .data
        let videoList = [];
        if (data.items && Array.isArray(data.items)) {
          videoList = data.items;
        } else if (data.data && Array.isArray(data.data)) {
          videoList = data.data;
        } else if (data.contents && Array.isArray(data.contents)) {
          videoList = data.contents;
        } else if (Array.isArray(data)) {
          videoList = data;
        }

        setVideos(videoList);
      })
      .catch((err) => console.error("Search fetch failed:", err));
  }, [searchTerm]);

  return (
    <div style={{ padding: '24px', minHeight: '92vh', background: '#121212', color: 'white' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
        Search Results for: <span style={{ color: '#ff0000' }}>"{searchTerm}"</span>
      </h2>
      
      {videos.length === 0 ? (
        <p style={{ color: '#aaa' }}>Loading videos from YouTube API...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {videos.map((item, index) => {
            // Keep a fallback key to ensure React maps items smoothly
            const uniqueKey = item?.id?.videoId || item?.id || index;
            return <VideoCard key={uniqueKey} video={item} />;
          })}
        </div>
      )}
    </div>
  );
}