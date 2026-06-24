// src/components/VideoCard.jsx
import React from 'react';

export default function VideoCard({ video }) {
  const videoId = video?.id?.videoId || video?.videoId || video?.id;
  
  const thumbnailUrl = 
    video?.snippet?.thumbnails?.high?.url || 
    video?.snippet?.thumbnails?.medium?.url || 
    video?.thumbnail?.url ||
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (!videoId) return null;

  return (
    <div style={{ 
      backgroundColor: '#1f1f1f', 
      borderRadius: '8px', 
      overflow: 'hidden', 
      display: 'flex', 
      flexDirection: 'column',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    }}>
      {/* Clickable Live Media Stream Thumbnail */}
      <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
        <img 
          src={thumbnailUrl} 
          alt="YouTube Media Resource" 
          style={{ width: '100%', height: '180px', objectFit: 'cover', cursor: 'pointer' }} 
        />
      </a>

      {/* Modern Compact Description Slate */}
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>📺</span>
          <span style={{ fontSize: '13px', color: '#00aaff', fontWeight: '500', cursor: 'pointer' }}>
            Watch Live Content
          </span>
        </div>
        <div style={{ height: '2px', background: '#333', margin: '4px 0' }} />
        <span style={{ fontSize: '11px', color: '#888' }}>ID Reference: {videoId}</span>
      </div>
    </div>
  );
}