import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Default to a relative `/api` during development so Vite's proxy forwards requests
// to the backend when running inside a dev container. In production or when a
// custom API URL is provided, `VITE_API_URL` will be used.
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:3000/api');

export const stationService = {
  async getAllStations() {
    try {
      const response = await axios.get(`${API_URL}/stations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  },

  async getStationsByCountry(country) {
    try {
      const response = await axios.get(`${API_URL}/stations/country/${country}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stations by country:', error);
      throw error;
    }
  },

  async getStationsByTag(tag) {
    try {
      const response = await axios.get(`${API_URL}/stations/tag/${tag}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stations by tag:', error);
      throw error;
    }
  },

  async getStation(id) {
    try {
      const response = await axios.get(`${API_URL}/stations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching station:', error);
      throw error;
    }
  }
};
