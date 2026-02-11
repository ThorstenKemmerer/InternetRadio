const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  stationuuid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  url_stream: {
    type: String,
    required: true
  },
  url_homepage: {
    type: String,
    default: ''
  },
  url_favicon: {
    type: String,
    default: ''
  },
  tags: {
    type: String,
    default: ''
  },
  iso_3166_1: {
    type: String,
    default: ''
  },
  iso_3166_2: {
    type: String,
    default: ''
  },
  iso_639: {
    type: String,
    default: null
  },
  geo_lat: {
    type: Number,
    default: null
  },
  geo_long: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Station', stationSchema);
