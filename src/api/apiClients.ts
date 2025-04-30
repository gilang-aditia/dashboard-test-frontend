import axios from "axios";

const API_URL = process.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 30000,
});

export default apiClient;
