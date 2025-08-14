import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
  }
});

export default api;
