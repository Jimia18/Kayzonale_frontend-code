
// src/axios.js
import axios from 'axios';

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    Authorization: `Bearer ${token}`
  }
});


export default api;
