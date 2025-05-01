import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiClients";

export const useProduct = () => {
  return useQuery({
    queryKey: ["AllProductList"],
    queryFn: async () => {
      const response = await apiClient.get("/products");

      return response.products || [];
    },
  });
};
