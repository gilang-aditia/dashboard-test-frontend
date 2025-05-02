import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiClients";

type ProductResponse = {
  products: any[];
  total: number;
  skip: number;
  limit: number;
};

export const useDAshboardProduct = () => {
  return useQuery<ProductResponse>({
    queryKey: ["AllProductList"],
    queryFn: async () => {
      const response = await apiClient.get("/products");
      return response;
    },
  });
};
export const useDAshboardcarts = () => {
  return useQuery<ProductResponse>({
    queryKey: ["AllCartsList"],
    queryFn: async () => {
      const response = await apiClient.get("/carts");
      return response;
    },
  });
};
export const useDAshboardPosts = () => {
  return useQuery<ProductResponse>({
    queryKey: ["AllPostsList"],
    queryFn: async () => {
      const response = await apiClient.get("/posts");
      return response;
    },
  });
};
export const useDAshboardRecipes = () => {
  return useQuery<ProductResponse>({
    queryKey: ["AllRecipesList"],
    queryFn: async () => {
      const response = await apiClient.get("/recipes");
      return response;
    },
  });
};
