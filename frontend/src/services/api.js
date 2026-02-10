import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

  async getStationsByGenre(genre) {
    try {
      const response = await axios.get(`${API_URL}/stations/genre/${genre}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stations by genre:', error);
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
