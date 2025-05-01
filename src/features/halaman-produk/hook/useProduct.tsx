import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiClients";

// useProduct hook
export const useProduct = () => {
  return useQuery({
    queryKey: ["AllProductList"],
    queryFn: async () => {
      const response = await apiClient.get("/products");
      // Karena interceptor sudah return response.data,
      // langsung return hasilnya (tidak perlu .data lagi)
      return response.products || [];
    },
  });
};
