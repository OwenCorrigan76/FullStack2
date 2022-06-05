import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const venueService = {
  donationUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.donationUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.donationUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.donationUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.donationUrl}/api/users`);
    return res.data;
  },
  async createVenue(venue) {
    const res = await axios.post(`${this.playtimeUrl}/api/venues`, venue);
    return res.data;
  },
  async deleteAllVenues() {
    const response = await axios.delete(`${this.playtimeUrl}/api/venues`);
    return response.data;
  },
  async deleteVenue(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/venues/${id}`);
    return response;
  },
  async getAllVenues() {
    const res = await axios.get(`${this.playtimeUrl}/api/venues`);
    return res.data;
  },
  async getVenue(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/venues/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.donationUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async makeVenue(id, venue) {
    const response = await axios.post(`${this.donationUrl}/api/countries/${id}/venues`, venue);
    return response.data;
  },

  async getVenues(id) {
    const response = await axios.get(`${this.donationUrl}/api/countries/${id}/venues`);
    return response.data;
  },

  async createCountry(newCountry) {
    const response = await axios.post(`${this.donationUrl}/api/countries`, newCountry);
    return response.data;
  },
};
