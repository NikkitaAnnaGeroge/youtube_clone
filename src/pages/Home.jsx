// src/pages/Home.jsx
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../mockData';

export default function Home() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px'
      }}>
        {mockVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}