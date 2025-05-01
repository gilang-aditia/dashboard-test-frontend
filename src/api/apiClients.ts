// src/api/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://dummyjson.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Tambahkan interceptor jika diperlukan
apiClient.interceptors.response.use(
  (response) => response.data, // Otomatis unpack response data
  (error) => {
    // Handle error secara global
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export default apiClient;
