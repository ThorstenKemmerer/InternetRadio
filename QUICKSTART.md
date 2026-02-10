# Quick Start Guide

Get the Internet Radio app running in under 2 minutes!

## Prerequisites
- Node.js 14+ installed
- npm or yarn

## Installation & Running

### 1. Clone and Install

```bash
git clone https://github.com/ThorstenKemmerer/InternetRadio.git
cd InternetRadio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

### 2. Start the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:standalone
```
✅ You should see: "Server is running on port 3000"

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ You should see: "Local: http://localhost:5173/"

### 3. Open in Browser

Visit: **http://localhost:5173**

## Usage

1. 🎵 **Browse stations** - Scroll through the station cards
2. 🔍 **Filter** - Use the Genre and Country dropdowns to filter stations
3. 🎧 **Select** - Click any station card to select it
4. ▶️ **Play** - Click the Play button to start streaming
5. 🔊 **Adjust volume** - Use the volume slider

## What's Included

The app comes pre-loaded with 10 radio stations:
- **ABC Classic** (Australia, Classical)
- **BBC Radio 1** (UK, Pop)
- **Deutschlandfunk** (Germany, News)
- **France Inter** (France, Talk)
- **KEXP** (USA, Alternative)
- **NHK Radio Japan** (Japan, Various)
- **NPR News** (USA, News)
- **Radio Paradise** (USA, Rock)
- **Radio Swiss Jazz** (Switzerland, Jazz)
- **SomaFM - Groove Salad** (USA, Ambient)

## MongoDB Setup (Optional)

The quick start uses in-memory storage. For persistent data:

1. Install and start MongoDB
2. Copy `backend/.env.example` to `backend/.env`
3. Update MONGODB_URI in `.env`
4. Run `npm run seed` to populate the database
5. Use `npm start` instead of `npm run start:standalone`

## Troubleshooting

**Port already in use?**
- Backend: Change PORT in `backend/.env` or use `PORT=3001 npm run start:standalone`
- Frontend: Change port in `frontend/vite.config.js`

**Stream won't play?**
- Some streams may be geo-restricted or temporarily offline
- Try a different station
- Check browser console for errors

**Can't connect to backend?**
- Ensure backend is running on port 3000
- Check that `http://localhost:3000/api/stations` returns data

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [SECURITY.md](SECURITY.md) for production deployment guidance
- Customize the station list in `backend/server-standalone.js`
- Add your own favorite radio stations!

Enjoy listening! 🎶
