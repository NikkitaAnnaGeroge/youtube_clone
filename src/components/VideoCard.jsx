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
        <span style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          color: '#fff',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '18px',
          fontFamily: 'sans-serif'
        }}>
          {video?.snippet?.title || video?.title || "Watch Live Content"}
        </span>
        <span style={{ fontSize: '12px', color: '#aaa', marginTop: '2px', fontFamily: 'sans-serif' }}>
          {video?.snippet?.channelTitle || video?.channelTitle || "YouTube Channel"}
        </span>
        <div style={{ height: '1px', background: '#333', margin: '6px 0' }} />
        <span style={{ fontSize: '11px', color: '#888', fontFamily: 'sans-serif' }}>
          {video?.snippet?.publishedAt ? new Date(video.snippet.publishedAt).toLocaleDateString() : (video?.uploadedAt || "Live Reference")}
        </span>
      </div>
    </div>
  );
}