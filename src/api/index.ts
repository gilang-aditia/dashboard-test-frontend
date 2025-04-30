import apiClient from "./apiClients";

const api = {
  get: async (endpoint: string, params = {}) => {
    try {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw error; // Menyebarkan error agar bisa ditangani lebih lanjut jika perlu
    }
  },

  post: async (endpoint: string, data: any) => {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error; // Menyebarkan error agar bisa ditangani lebih lanjut jika perlu
    }
  },

  put: async (endpoint: string, data: any) => {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error; // Menyebarkan error agar bisa ditangani lebih lanjut jika perlu
    }
  },

  delete: async (endpoint: string) => {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error; // Menyebarkan error agar bisa ditangani lebih lanjut jika perlu
    }
  },
};

export default api;
