import axios from 'axios';

const API_BASE_URL = 'http://localhost:5012'; 

export const apiService = {
  get: (endpoint) => axios.get(`${API_BASE_URL}/${endpoint}`, { withCredentials: true }),
  post: (endpoint, data) => axios.post(`${API_BASE_URL}/${endpoint}`, data, { withCredentials: true }),
  put: (endpoint, data) => axios.put(`${API_BASE_URL}/${endpoint}`, data, { withCredentials: true }),
  delete: (endpoint) => axios.delete(`${API_BASE_URL}/${endpoint}`, { withCredentials: true }),
};