const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  streamUrl: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'English'
  },
  bitrate: {
    type: String,
    default: '128kbps'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Station', stationSchema);
