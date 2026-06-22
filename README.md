# 🎥 YouTube Clone - React & Material UI

A premium, fully responsive **YouTube Clone** built using **React.js (Vite)**, **Material UI (MUI)**, and **React Router DOM**. The application features YouTube's classic dark mode theme, scrollable category navigation, real video playback (using live YouTube streams), active search filtering, custom channel pages, and interactive player states.

---

## ✨ Features

- 📱 **Fully Responsive Layout**: Adaptive interfaces optimized for mobile, tablet, and desktop screens. Collapsible drawer sidebars for clean mobile usage.
- 🎨 **Premium Aesthetics**: Seamless charcoal/black design (`#0f0f0f` background) based on YouTube's premium dark mode, styled using MUI theme customizers.
- 🚀 **Playable Video Player**: High-definition video player integration utilizing `react-player` to play live content.
- 💬 **Dynamic Comments Sub-system**: An interactive, memory-retained comment section where users can read and post new comments in real-time.
- 👍 **Interactive Action States**: Fully functional toggles for subscribing to channels and incrementing/decrementing like counters.
- 🗂️ **Category Navigation**: Horizontal scrolling navigation chips at the top of the feed and side options to instantly filter videos (Coding, JavaScript, Python, React, Algorithms, Physics, Mathematics, Science).
- 🔍 **Tailored Search Queries**: Complete navigation search routing that scans metadata records for channel name, video title, or tag matches.
- 🏢 **Channel Profiles**: Detailed viewpages for creators featuring header cover banners, sub counts, navigation tabs (Videos, Playlists, About), and grids containing all videos uploaded by the channel.
- 🛡️ **Graceful Image Fallbacks**: Fallback handler that displays clean programming-themed placeholder illustrations if a YouTube video thumbnail fails to load.

---

## 🛠️ Tech Stack

- **Framework**: [React.js](https://react.dev/) (Vite-scaffolded)
- **Styling & Components**: [Material UI (MUI) v6](https://mui.com/material-ui/)
- **Icons**: [@mui/icons-material](https://mui.com/material-ui/material-icons/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/en/main)
- **Video Renderer**: [React Player](https://www.npmjs.com/package/react-player)
- **Avatars**: [Dicebear Initials API](https://api.dicebear.com/)

---

## 📂 Project Structure

```text
youtube-clone/
├── public/                 # Static assets (Favicons, SVG icons)
├── src/
│   ├── assets/             # Images and local vector files
│   ├── components/
│   │   ├── Navbar.jsx      # Top navigation header & search bar
│   │   ├── Sidebar.jsx     # Vertical category navigation links
│   │   └── VideoCard.jsx   # Individual video card with hover animations
│   ├── pages/
│   │   ├── Feed.jsx        # Home page recommendations grid
│   │   ├── VideoDetail.jsx # Video player, comments, and related sidebar
│   │   ├── ChannelDetail.jsx # Channel profile cover & video history tabs
│   │   └── SearchFeed.jsx  # Search matching list view
│   ├── utils/
│   │   └── videoData.js    # Relational mock video database and comments storage
│   ├── App.jsx             # Theme config, CSS baseline reset, and Routing
│   ├── index.css           # Global layout adjustments and custom scrollbars
│   └── main.jsx            # React root mount point
├── index.html              # Custom Google Font loads and SEO tags
└── package.json            # Dependencies and script definitions
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have Node.js and npm installed:
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### ⚙️ Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NikkitaAnnaGeroge/youtube_clone.git
   cd youtube_clone
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   *The application will launch locally at `http://localhost:5173/`.*

4. **Build the production package**:
   ```bash
   npm run build
   ```

---

## 🔒 License

This project is open-source and available under the [MIT License](LICENSE).
