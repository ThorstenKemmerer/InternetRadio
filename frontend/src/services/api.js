import axios from 'axios';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// Default to a relative `/api` during development so Vite's proxy forwards requests
// to the backend when running inside a dev container. In production or when a
// custom API URL is provided, `VITE_API_URL` will be used.
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'http://localhost:3000/api');

export const stationService = {
  async getStations({ page = 1, limit = 50, name = '', tag = '', country = '', language = '' } = {}) {
    try {
      const response = await axios.get(`${API_URL}/stations`, {
        params: {
          page,
          limit,
          name: name || undefined,
          tag: tag || undefined,
          country: country || undefined,
          language: language || undefined
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stations:', error);
      throw error;
    }
  },
  async getCountries() {
    try {
      const response = await axios.get(`${API_URL}/stations/countries`);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },
  async getTags() {
    try {
      const response = await axios.get(`${API_URL}/stations/tags`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tags:', error);
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
