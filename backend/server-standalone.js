const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for development/demo (replace with MongoDB in production)
let stations = [
  {
    _id: '1',
    name: 'BBC Radio 1',
    streamUrl: 'http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one',
    country: 'United Kingdom',
    genre: 'Pop',
    description: 'The best new music and entertainment',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/BBC_Radio_1_logo.svg/200px-BBC_Radio_1_logo.svg.png',
    language: 'English',
    bitrate: '128kbps'
  },
  {
    _id: '2',
    name: 'NPR News',
    streamUrl: 'https://npr-ice.streamguys1.com/live.mp3',
    country: 'United States',
    genre: 'News',
    description: 'National Public Radio news coverage',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/National_Public_Radio_logo.svg/200px-National_Public_Radio_logo.svg.png',
    language: 'English',
    bitrate: '128kbps'
  },
  {
    _id: '3',
    name: 'Radio Paradise',
    streamUrl: 'https://stream.radioparadise.com/aac-320',
    country: 'United States',
    genre: 'Rock',
    description: 'Eclectic online radio',
    imageUrl: 'https://img.radioparadise.com/logos/rp_logo-200.png',
    language: 'English',
    bitrate: '320kbps'
  },
  {
    _id: '4',
    name: 'France Inter',
    streamUrl: 'https://icecast.radiofrance.fr/franceinter-midfi.mp3',
    country: 'France',
    genre: 'Talk',
    description: 'French public radio station',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Logo_France_Inter_2021.svg/200px-Logo_France_Inter_2021.svg.png',
    language: 'French',
    bitrate: '128kbps'
  },
  {
    _id: '5',
    name: 'KEXP',
    streamUrl: 'https://kexp-mp3-128.streamguys1.com/kexp128.mp3',
    country: 'United States',
    genre: 'Alternative',
    description: 'Where the music matters',
    imageUrl: 'https://kexp.org/appdata/img/default-album-art.jpg',
    language: 'English',
    bitrate: '128kbps'
  },
  {
    _id: '6',
    name: 'Radio Swiss Jazz',
    streamUrl: 'http://stream.srg-ssr.ch/m/rsj/mp3_128',
    country: 'Switzerland',
    genre: 'Jazz',
    description: 'The finest jazz selection',
    imageUrl: 'https://www.radioswissjazz.ch/typo3conf/ext/srgssr_theme/Resources/Public/Images/logo.svg',
    language: 'Multi',
    bitrate: '128kbps'
  },
  {
    _id: '7',
    name: 'Deutschlandfunk',
    streamUrl: 'https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3',
    country: 'Germany',
    genre: 'News',
    description: 'German public radio news',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Deutschlandfunk_Logo.svg/200px-Deutschlandfunk_Logo.svg.png',
    language: 'German',
    bitrate: '128kbps'
  },
  {
    _id: '8',
    name: 'SomaFM - Groove Salad',
    streamUrl: 'https://somafm.com/groovesalad130.pls',
    country: 'United States',
    genre: 'Ambient',
    description: 'A nicely chilled plate of ambient beats and grooves',
    imageUrl: 'https://somafm.com/img/groovesalad400.jpg',
    language: 'English',
    bitrate: '130kbps'
  },
  {
    _id: '9',
    name: 'ABC Classic',
    streamUrl: 'https://live-radio01.mediahubaustralia.com/2CLW/mp3/',
    country: 'Australia',
    genre: 'Classical',
    description: 'Australia\'s classical music radio station',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/ABC_Classic_logo.svg/200px-ABC_Classic_logo.svg.png',
    language: 'English',
    bitrate: '128kbps'
  },
  {
    _id: '10',
    name: 'NHK Radio Japan',
    streamUrl: 'http://radiostream.nhk.or.jp/hls/live/2023229/nhkradiruakr1/master.m3u8',
    country: 'Japan',
    genre: 'Various',
    description: 'NHK Radio from Tokyo',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/NHK_logo.svg/200px-NHK_logo.svg.png',
    language: 'Japanese',
    bitrate: '128kbps'
  }
];

// API Routes
// Get all stations
app.get('/api/stations', (req, res) => {
  res.json(stations.sort((a, b) => a.name.localeCompare(b.name)));
});

// Get stations by country
app.get('/api/stations/country/:country', (req, res) => {
  const filtered = stations.filter(s => s.country === req.params.country);
  res.json(filtered);
});

// Get stations by genre
app.get('/api/stations/genre/:genre', (req, res) => {
  const filtered = stations.filter(s => s.genre === req.params.genre);
  res.json(filtered);
});

// Get single station
app.get('/api/stations/:id', (req, res) => {
  const station = stations.find(s => s._id === req.params.id);
  if (!station) {
    return res.status(404).json({ message: 'Station not found' });
  }
  res.json(station);
});

// Create new station
app.post('/api/stations', (req, res) => {
  const newStation = {
    _id: String(stations.length + 1),
    name: req.body.name,
    streamUrl: req.body.streamUrl,
    country: req.body.country,
    genre: req.body.genre,
    description: req.body.description || '',
    imageUrl: req.body.imageUrl || '',
    language: req.body.language || 'English',
    bitrate: req.body.bitrate || '128kbps'
  };
  stations.push(newStation);
  res.status(201).json(newStation);
});

// Update station
app.put('/api/stations/:id', (req, res) => {
  const index = stations.findIndex(s => s._id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Station not found' });
  }
  
  stations[index] = { ...stations[index], ...req.body, _id: stations[index]._id };
  res.json(stations[index]);
});

// Delete station
app.delete('/api/stations/:id', (req, res) => {
  const index = stations.findIndex(s => s._id === req.params.id);
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
