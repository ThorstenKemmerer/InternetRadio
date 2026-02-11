const express = require('express');
const router = express.Router();
const Station = require('../models/Station');
const { getCountryName } = require('../utils/countryLookup');

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const getStationTags = tags => (tags ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : []);

// Get all stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find().sort({ name: 1 });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get list of countries (ISO code + display name)
router.get('/countries', async (req, res) => {
  try {
    const codes = await Station.distinct('iso_3166_1');
    const filtered = codes.filter(Boolean).sort((a, b) => a.localeCompare(b));
    res.json(filtered.map(code => ({ code, name: getCountryName(code) })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get list of tags
router.get('/tags', async (req, res) => {
  try {
    const stations = await Station.find({}, { tags: 1, _id: 0 });
    const tagSet = new Set();
    stations.forEach(station => {
      getStationTags(station.tags).forEach(tag => tagSet.add(tag));
    });
    res.json([...tagSet].sort((a, b) => a.localeCompare(b)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stations by country (ISO 3166-1 code)
router.get('/country/:country', async (req, res) => {
  try {
    const stations = await Station.find({ iso_3166_1: req.params.country });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stations by tag
router.get('/tag/:tag', async (req, res) => {
  try {
    const tag = req.params.tag.trim();
    const regex = new RegExp(`(^|,\\s*)${escapeRegExp(tag)}(,|$)`, 'i');
    const stations = await Station.find({ tags: regex });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single station
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findOne({ stationuuid: req.params.id });
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new station
router.post('/', async (req, res) => {
  const station = new Station({
    stationuuid: req.body.stationuuid,
    name: req.body.name,
    url_stream: req.body.url_stream,
    url_homepage: req.body.url_homepage,
    url_favicon: req.body.url_favicon,
    tags: req.body.tags,
    iso_3166_1: req.body.iso_3166_1,
    iso_3166_2: req.body.iso_3166_2,
    iso_639: req.body.iso_639,
    geo_lat: req.body.geo_lat,
    geo_long: req.body.geo_long
  });

  try {
    const newStation = await station.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update station
router.put('/:id', async (req, res) => {
  try {
    const station = await Station.findOne({ stationuuid: req.params.id });
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        station[key] = req.body[key];
      }
    });

    const updatedStation = await station.save();
    res.json(updatedStation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete station
router.delete('/:id', async (req, res) => {
  try {
    const station = await Station.findOne({ stationuuid: req.params.id });
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    await station.deleteOne();
    res.json({ message: 'Station deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
