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
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ThorstenKemmerer/InternetRadio.git
cd InternetRadio
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/internet-radio
NODE_ENV=development
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

## Running the Application

### Quick Start (No MongoDB Required)

For quick testing without MongoDB, you can use the standalone mode with in-memory storage:

```bash
# Terminal 1 - Backend with in-memory storage
cd backend
npm run start:standalone

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Then visit `http://localhost:5173` in your browser.

### Full Stack with MongoDB

### 1. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# On Linux/Mac
mongod

# On Windows (if MongoDB is installed as a service)
net start MongoDB
```

### 2. Seed the Database (First time only)

```bash
cd backend
npm run seed
```

This will populate the database with sample radio stations from around the world.

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

