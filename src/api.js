// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
  ? 'https://mern-assi-backend.vercel.app/api' 
  : '/api', // Adjust to your backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
