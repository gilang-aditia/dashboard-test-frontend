import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiClients";

// Create a type to indicate your apiClient returns data directly
interface ProductsResponse {
  products: any[];
  [key: string]: any;
}

export const useProduct = () => {
  return useQuery({
    queryKey: ["AllProductList"],
    queryFn: async () => {
      // Cast the response to your expected type to resolve TypeScript error
      const response = (await apiClient.get(
        "/products",
      )) as unknown as ProductsResponse;
      return response.products || [];
    },
  });
};
