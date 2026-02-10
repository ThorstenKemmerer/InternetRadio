const mongoose = require('mongoose');
require('dotenv').config();
const Station = require('./models/Station');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/internet-radio';

const sampleStations = [
  {
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
    name: 'Radio Garden - Tokyo',
    streamUrl: 'http://radiostream.nhk.or.jp/hls/live/2023229/nhkradiruakr1/master.m3u8',
    country: 'Japan',
    genre: 'Various',
    description: 'NHK Radio from Tokyo',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/NHK_logo.svg/200px-NHK_logo.svg.png',
    language: 'Japanese',
    bitrate: '128kbps'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing stations
    await Station.deleteMany({});
    console.log('Cleared existing stations');

    // Insert sample stations
    await Station.insertMany(sampleStations);
    console.log('Sample stations added successfully');

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
