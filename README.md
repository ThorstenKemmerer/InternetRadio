# InternetRadio

A full-stack web application for listening to internet radio streams from around the world, built with the MEVN stack (MongoDB, Express, Vue.js, Node.js).

## Features

- 🎵 Listen to radio streams from multiple countries
- 🌍 Browse stations by country and genre
- 🎨 Modern, responsive UI built with Vue 3
- 📻 Real-time audio streaming
- 🎚️ Volume control
- 🔍 Filter stations by genre and country

## Tech Stack

- **Frontend**: Vue.js 3 + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **HTTP Client**: Axios

## Prerequisites

Before you begin, ensure you have the following installed:
# InternetRadio

InternetRadio is a small full-stack app for browsing and listening to internet radio stations. It uses a Vue 3 + Vite frontend and an Express + MongoDB backend.

Quick links
- Frontend dev: `cd frontend && npm run dev`
- Backend dev: `cd backend && npm run dev`
- Seed sample data: `cd backend && npm run seed`

Prerequisites
- Node.js (14+), npm
- MongoDB (for full-stack mode)

Quickstart (standalone, no MongoDB)
1. Start backend in standalone mode (in-memory):

```bash
cd backend
npm install
npm run start:standalone
```

2. Start frontend:

```bash
cd frontend
npm install
npm run dev
```

Open the app at http://localhost:5173

Full stack (with MongoDB)
1. Ensure MongoDB is running locally or set `MONGODB_URI` in `backend/.env` (example in `backend/.env.example`).
2. Install and seed:

```bash
cd backend
npm install
npm run seed
npm run dev
```
3. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

API (default base `http://localhost:3000`)
- `GET /api/stations` — list stations
- `GET /api/stations/:id` — station detail
- `POST /api/stations` — add station
- `PUT /api/stations/:id` — update station
- `DELETE /api/stations/:id` — remove station

Project layout (important files)
- `backend/` — Express server, Mongoose models (`models/Station.js`), routes (`routes/stations.js`)
- `backend/seed.js` — sample data seeding script
- `frontend/` — Vue 3 + Vite app; main UI components in `frontend/src/components`

Contributing
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`.
- Keep PRs small and include manual verification steps.

Tips
- If frontend can't reach the API, check `backend` is running and `MONGODB_URI` (when using full stack).

License
- MIT — see LICENSE


### 3. Start the Backend Server

```bash
cd backend
npm start

# For development with auto-reload:
npm run dev
```

The backend API will be running at `http://localhost:3000`

### 4. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be running at `http://localhost:5173`

### 5. Open the Application

Visit `http://localhost:5173` in your web browser to use the application.

## API Endpoints

- `GET /api/stations` - Get all radio stations
- `GET /api/stations/:id` - Get a specific station
- `GET /api/stations/country/:country` - Get stations by country
- `GET /api/stations/genre/:genre` - Get stations by genre
- `POST /api/stations` - Create a new station
- `PUT /api/stations/:id` - Update a station
- `DELETE /api/stations/:id` - Delete a station

## Project Structure

```
InternetRadio/
├── backend/
│   ├── models/
│   │   └── Station.js
│   ├── routes/
│   │   └── stations.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── RadioPlayer.vue
│   │   │   └── StationList.vue
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Usage

1. Browse through the list of radio stations
2. Filter stations by genre or country using the dropdown filters
3. Click on a station card to select it
4. Click the "Play" button to start streaming
5. Adjust the volume using the volume slider
6. Click "Pause" to stop the stream

## Adding New Stations

You can add new radio stations through the API:

```bash
curl -X POST http://localhost:3000/api/stations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Station Name",
    "streamUrl": "http://stream-url.com/stream",
    "country": "Country",
    "genre": "Genre",
    "description": "Description",
    "imageUrl": "http://image-url.com/image.jpg",
    "language": "Language",
    "bitrate": "128kbps"
  }'
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

