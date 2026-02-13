const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Station = require('./models/Station');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/internet-radio';
const dataPath = path.join(__dirname, '..', 'radiobrowser_stations_latest.json');
const rawStations = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const normalizeTags = (value) => {
  if (!value) {
    return '';
  }

  return value
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
    .slice(0, 5)
    .join(',');
};

const normalizeName = (value, fallback) => {
  const name = value ? String(value).trim() : '';
  const safeFallback = fallback ? String(fallback).trim() : 'Unknown Station';

  if (!name) {
    return safeFallback;
  }

  if (name.length <= 50) {
    return name;
  }

  const separatorMatch = name.match(/[.,\-_/+\\]/);
  if (separatorMatch && separatorMatch.index > 0) {
    const trimmed = name.slice(0, separatorMatch.index).trim();
    if (trimmed) {
      return trimmed;
    }
  }

  const truncated = name.slice(0, 50).trim();
  return truncated || safeFallback;
};

const stationsToInsert = rawStations.map(station => ({
  stationuuid: station.stationuuid,
  name: normalizeName(station.name, station.stationuuid),
  url_stream: station.url_stream,
  url_homepage: station.url_homepage || '',
  url_favicon: station.url_favicon || '',
  tags: normalizeTags(station.tags),
  iso_3166_1: station.iso_3166_1 || '',
  iso_3166_2: station.iso_3166_2 || '',
  iso_639: station.iso_639 ?? null,
  geo_lat: station.geo_lat ?? null,
  geo_long: station.geo_long ?? null
}));

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing stations
    await Station.deleteMany({});
    console.log('Cleared existing stations');

    // Insert stations from RadioBrowser dump
    await Station.insertMany(stationsToInsert);
    console.log(`Inserted ${stationsToInsert.length} stations`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
