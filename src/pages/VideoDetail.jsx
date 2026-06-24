// src/pages/VideoDetail.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockVideos } from '../mockData';

export default function VideoDetail() {
  const { id } = useParams();
  const video = mockVideos.find(v => v.id === id);

  // Local state to hold our dynamic array of comments
  const [comments, setComments] = useState([
    { id: 1, author: 'Alex Reed', text: 'This explanation of React routing makes so much sense! Thanks!', timestamp: '2 hours ago' },
    { id: 2, author: 'Sarah Jenkins', text: 'Perfect video to study along with.', timestamp: '1 day ago' }
  ]);
  
  // State to track text inside the new comment text field
  const [newCommentText, setNewCommentText] = useState('');

  if (!video) {
    return <div style={{ padding: '24px' }}>⚠️ Video not found!</div>;
  }

  // Handle addition of comment array list item
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const freshComment = {
      id: Date.now(),
      author: 'You (Viewer)',
      text: newCommentText,
      timestamp: 'Just now'
    };

    setComments([freshComment, ...comments]); // Adds new comment to top of list
    setNewCommentText(''); // Resets text field input container
  };

  return (
    <div style={{ padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {/* Left Column: Video and Info */}
      <div style={{ flex: '1 1 700px' }}>
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000' }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        <h1 style={{ fontSize: '20px', margin: '16px 0 8px 0' }}>{video.title}</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0', borderBottom: '1px solid #383838', paddingBottom: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ff0000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {video.channelTitle[0]}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px' }}>{video.channelTitle}</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>1.5M subscribers</p>
          </div>
          <button style={{ marginLeft: 'auto', background: 'white', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
            Subscribe
          </button>
        </div>

        <div style={{ background: '#212121', padding: '12px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px' }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{video.views} • {video.uploadedAt}</p>
          <p style={{ margin: 0, color: '#ddd', lineHeight: '20px' }}>{video.description}</p>
        </div>

        {/* --- Interactive Comments Component Section --- */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{comments.length} Comments</h3>
          
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
              Y
            </div>
            <div style={{ flexGrow: 1 }}>
              <input 
                type="text"
                placeholder="Add a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #383838', color: 'white', padding: '8px 0', fontSize: '14px', outline: 'none' }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setNewCommentText('')} style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Cancel</button>
                <button type="submit" style={{ background: '#313131', color: '#aaa', border: 'none', padding: '8px 16px', borderRadius: '18px', cursor: 'pointer', fontWeight: 'bold' }}>Comment</button>
              </div>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {comments.map(c => (
              <div key={c.id} style={{ display: 'flex', gap: '12px', fontSize: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                  {c.author[0]}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 'bold' }}>{c.author}</span>
                    <span style={{ color: '#aaa', fontSize: '12px' }}>{c.timestamp}</span>
                  </div>
                  <p style={{ margin: 0, color: '#eee' }}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Video Sidebar */}
      <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '16px', margin: '0 0 8px 0' }}>Up Next</h2>
        {mockVideos.filter(v => v.id !== id).map(v => (
          <a href={`/video/${v.id}`} key={v.id} style={{ display: 'flex', gap: '8px', textDecoration: 'none', color: 'white' }}>
            <img src={v.thumbnail} alt={v.title} style={{ width: '120px', height: '68px', borderRadius: '8px', objectFit: 'cover' }} />
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{v.title}</h4>
              <p style={{ margin: 0, fontSize: '11px', color: '#aaa' }}>{v.channelTitle}</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#aaa' }}>{v.views}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}