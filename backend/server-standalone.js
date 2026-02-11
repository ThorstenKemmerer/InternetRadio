const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { getCountryName } = require('./utils/countryLookup');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for development/demo (replace with MongoDB in production)
const dataPath = path.join(__dirname, '..', 'radiobrowser_stations_latest.json');
const rawStations = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
let stations = rawStations.slice(0, 10).map(station => ({
  stationuuid: station.stationuuid,
  name: station.name,
  url_stream: station.url_stream,
  url_homepage: station.url_homepage || '',
  url_favicon: station.url_favicon || '',
  tags: station.tags || '',
  iso_3166_1: station.iso_3166_1 || '',
  iso_3166_2: station.iso_3166_2 || '',
  iso_639: station.iso_639 ?? null,
  geo_lat: station.geo_lat ?? null,
  geo_long: station.geo_long ?? null
}));

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const getStationTags = tags => (tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : []);

// API Routes
// Get all stations
app.get('/api/stations', (req, res) => {
  res.json(stations.sort((a, b) => a.name.localeCompare(b.name)));
});

// Get list of countries (ISO code + display name)
app.get('/api/stations/countries', (req, res) => {
  const codes = [...new Set(stations.map(station => station.iso_3166_1).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  res.json(codes.map(code => ({ code, name: getCountryName(code) })));
});

// Get list of tags
app.get('/api/stations/tags', (req, res) => {
  const tagSet = new Set();
  stations.forEach(station => {
    getStationTags(station.tags).forEach(tag => tagSet.add(tag));
  });
  res.json([...tagSet].sort((a, b) => a.localeCompare(b)));
});

// Get stations by country (ISO 3166-1 code)
app.get('/api/stations/country/:country', (req, res) => {
  const filtered = stations.filter(station => station.iso_3166_1 === req.params.country);
  res.json(filtered);
});

// Get stations by tag
app.get('/api/stations/tag/:tag', (req, res) => {
  const tag = req.params.tag.trim();
  const regex = new RegExp(`(^|,\\s*)${escapeRegExp(tag)}(,|$)`, 'i');
  const filtered = stations.filter(station => regex.test(station.tags || ''));
  res.json(filtered);
});

// Get single station
app.get('/api/stations/:id', (req, res) => {
  const station = stations.find(s => s.stationuuid === req.params.id);
  if (!station) {
    return res.status(404).json({ message: 'Station not found' });
  }
  res.json(station);
});

// Create new station
app.post('/api/stations', (req, res) => {
  const newStation = {
    stationuuid: req.body.stationuuid || `station-${Date.now()}`,
    name: req.body.name,
    url_stream: req.body.url_stream,
    url_homepage: req.body.url_homepage || '',
    url_favicon: req.body.url_favicon || '',
    tags: req.body.tags || '',
    iso_3166_1: req.body.iso_3166_1 || '',
    iso_3166_2: req.body.iso_3166_2 || '',
    iso_639: req.body.iso_639 ?? null,
    geo_lat: req.body.geo_lat ?? null,
    geo_long: req.body.geo_long ?? null
  };
  stations.push(newStation);
  res.status(201).json(newStation);
});

// Update station
app.put('/api/stations/:id', (req, res) => {
  const index = stations.findIndex(s => s.stationuuid === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Station not found' });
  }

  stations[index] = { ...stations[index], ...req.body, stationuuid: stations[index].stationuuid };
  res.json(stations[index]);
});

// Delete station
app.delete('/api/stations/:id', (req, res) => {
  const index = stations.findIndex(s => s.stationuuid === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Station not found' });
  }

  stations.splice(index, 1);
  res.json({ message: 'Station deleted' });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Internet Radio API Server - In-Memory Mode' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Using in-memory storage (no MongoDB required)');
});

module.exports = app;
