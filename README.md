# Cricbuzz Clone (MERN Stack)

A full-stack, real-time cricket platform inspired by Cricbuzz, built with **React, Node.js, Express, and MongoDB**, featuring live ball-by-ball commentary, real cricketer profiles, authentic country flags, ICC rankings, and an interactive **Admin Scorer Dashboard**.

---

## 🌟 Key Features

### 1. 🏏 Real-time Live Scores & Match Center
- **Live Match Ticker**: Horizontal filterable match cards showing Live (with pulsing red indicator), Upcoming, Finished, T20, Test, and ODI fixtures.
- **Detailed Match Center**:
  - **Live Commentary**: Instant ball-by-ball updates with colored badges (`SIX` in purple, `FOUR` in emerald, `WICKET` in bold red).
  - **Full Professional Scorecards**: Batting tables (R, B, 4s, 6s, SR), Bowling figures (O, M, R, W, Econ), Extras, and Fall of Wickets.
  - **Match Info & Squads**: Venue, Toss details, Umpires, and Playing XI.

### 2. 🛡️ Admin Scorer Console & Simulation
- **Live Ball-by-Ball Scorer**:
  - One-click scoring keypad (`+0`, `+1`, `+2`, `+3`, `+4 FOUR`, `+6 SIX`, `W Wicket!`, `Wide`, `No Ball`).
  - Automatic strike rotation and batsman/bowler stat updates.
  - Quick commentary templates and custom text.
- **Auto-Simulation Engine**:
  - Toggle live match simulation to automatically generate live balls, run updates, and commentary every 4.5 seconds for instant demonstrations.
- **Match Manager**: Create, edit, and delete matches.
- **Cricketer Manager**: Add international stars with authentic country codes and career statistics.
- **News Publisher**: Publish breaking cricket articles with category tags and cover photos.
- **Zero-Setup Database Reset**: One-click restore to default Cricbuzz seed data.

### 3. 👤 Authentic Cricketer Profiles & Country Flags
- Featured stars: **Virat Kohli, Rohit Sharma, Jasprit Bumrah, Hardik Pandya, Pat Cummins, Travis Head, Steve Smith, Babar Azam, Ben Stokes, Jos Buttler, Heinrich Klaasen, Rashid Khan**, and more.
- Official country flags via high-speed CDN (India, Australia, England, South Africa, Pakistan, New Zealand, Afghanistan, Sri Lanka).
- Full career statistics modals across Test, ODI, and T20 formats.

### 4. 🏆 Official ICC Rankings
- Team rankings for Test, ODI, and T20I formats with ratings and points.
- Top ranked batsmen and bowlers.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- MongoDB (Optional: The backend has an automatic zero-config in-memory fallback, so you can run and test everything immediately without installing or running MongoDB first!)

### 1. Run the Backend (Express + MongoDB)
```bash
cd backend
npm install
node server.js
```
The backend starts on `http://localhost:5000` with live REST endpoints and SSE streams.

To connect your own MongoDB database (Local or MongoDB Atlas), edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cricbuzz
```

### 2. Run the Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```
The frontend is available at `http://localhost:3000`.

---

## 📁 Project Architecture
```
cricbuzz-clone/
├── backend/
│   ├── config/
│   │   └── db.js              # Mongoose DB connection with graceful fallback
│   ├── data/
│   │   └── seedData.js        # Authentic cricketers, teams, matches, and news
│   ├── models/
│   │   ├── Match.js           # Mongoose Match Schema with scorecard & commentary
│   │   ├── Player.js          # Cricketer Schema with Test/ODI/T20 career records
│   │   ├── Team.js            # Team Schema with country flags & rankings
│   │   └── News.js            # Cricket Article Schema
│   ├── routes/
│   │   ├── matchRoutes.js     # Live score & SSE streaming routes
│   │   ├── playerRoutes.js    # Cricketer directory routes
│   │   ├── teamRoutes.js      # Teams & ICC rankings routes
│   │   ├── newsRoutes.js      # News articles routes
│   │   └── adminRoutes.js     # Scorer pad, CRUD & live simulation engine
│   ├── services/
│   │   └── dataService.js     # Real-time scoring logic & data management
│   ├── package.json
│   └── server.js              # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx            # Cricbuzz signature dark green header
    │   │   ├── MatchTicker.jsx       # Real-time match card carousel & filters
    │   │   ├── MatchCenterModal.jsx  # Live scorecard, commentary & match info
    │   │   ├── AdminDashboard.jsx    # Live scoring console, match & player manager
    │   │   ├── PlayersDirectory.jsx  # Cricketers directory with country filters
    │   │   ├── PlayerProfileModal.jsx# Full career stats & ICC rankings modal
    │   │   ├── RankingsView.jsx      # ICC Team & Player Rankings
    │   │   ├── NewsSection.jsx       # Cricket news & articles modal
    │   │   └── Footer.jsx            # Cricbuzz styled footer
    │   ├── App.jsx                   # Central state & SSE live stream listener
    │   ├── index.css                 # Custom Cricbuzz animations & Tailwind
    │   └── main.jsx
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```
