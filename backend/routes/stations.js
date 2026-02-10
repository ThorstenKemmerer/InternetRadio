const express = require('express');
const router = express.Router();
const Station = require('../models/Station');

// Get all stations
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find().sort({ name: 1 });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stations by country
router.get('/country/:country', async (req, res) => {
  try {
    const stations = await Station.find({ country: req.params.country });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get stations by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const stations = await Station.find({ genre: req.params.genre });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single station
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
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
    name: req.body.name,
    streamUrl: req.body.streamUrl,
    country: req.body.country,
    genre: req.body.genre,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    language: req.body.language,
    bitrate: req.body.bitrate
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
    const station = await Station.findById(req.params.id);
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
    const station = await Station.findById(req.params.id);
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
