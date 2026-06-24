// src/components/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Home', icon: '🏠', path: '/' },
    { name: 'Shorts', icon: '🩳', path: '/shorts' },
    { name: 'Subscriptions', icon: '🔔', path: '/subscriptions' },
    { name: 'Library', icon: '📁', path: '/library' },
    { name: 'History', icon: '📜', path: '/history' },
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#0f0f0f',
      padding: '12px 0',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 70px)',
      boxSizing: 'border-box',
      borderRight: '1px solid #212121'
    }}>
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '10px 24px',
              cursor: 'pointer',
              position: 'relative',
              backgroundColor: isActive ? '#272727' : 'transparent',
              borderRadius: '10px',
              margin: '0 12px 4px 12px',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = '#212121';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {/* YouTube Red Indicator Bar for Active Page */}
            {isActive && (
              <div style={{
                position: 'absolute',
                left: '-12px',
                top: '20%',
                height: '60%',
                width: '3px',
                backgroundColor: '#ff0000',
                borderRadius: '0 4px 4px 0'
              }} />
            )}

            {/* Icon */}
            <span style={{ fontSize: '20px' }}>{item.icon}</span>

            {/* Text Label */}
            <span style={{ 
              fontSize: '14px', 
              fontWeight: isActive ? '500' : '400', 
              color: '#ffffff',
              fontFamily: '"Roboto", "Arial", sans-serif'
            }}>
              {item.name}
            </span>
          </div>
        );
      })}
    </aside>
  );
}