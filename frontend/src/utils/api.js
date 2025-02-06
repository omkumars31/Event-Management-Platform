import axios from "axios";

// Replace with your backend API URL
const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
