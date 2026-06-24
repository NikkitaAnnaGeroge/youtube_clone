// src/components/Header.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`); // Pushes the browser path to search query context
    }
  };

  return (
    <header style={{ 
      padding: '15px 30px', 
      background: '#202020', 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderBottom: '1px solid #383838'
    }}>
      {/* Clicking the YouTube heading logo takes the user back to the Home feed */}
      <h2 onClick={() => navigate('/')} style={{ margin: 0, color: '#ff0000', cursor: 'pointer' }}>YouTube</h2>
      
      <form onSubmit={handleSearchSubmit} style={{ display: 'flex' }}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: '8px 12px', 
            width: '400px', 
            background: '#121212', 
            border: '1px solid #383838', 
            color: 'white',
            borderRadius: '2px 0 0 2px',
            outline: 'none'
          }} 
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#313131', border: '1px solid #383838', color: 'white', cursor: 'pointer', borderRadius: '0 2px 2px 0' }}>
          🔍
        </button>
      </form>
      
      <div style={{ cursor: 'pointer' }}>👤 Profile</div>
    </header>
  );
}