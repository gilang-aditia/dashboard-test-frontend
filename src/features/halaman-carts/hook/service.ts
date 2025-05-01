import apiClient from "../../../api/apiClients";
import { CartsResponse, Cart } from "../types/carts-type";

export const fetchCarts = async (params?: {
  limit?: number;
  skip?: number;
}): Promise<CartsResponse> => {
  const response = await apiClient.get<CartsResponse>("/carts", { params });
  return response;
};

export const fetchCartById = async (id: number): Promise<Cart> => {
  const response = await apiClient.get<Cart>(`/carts/${id}`);
  return response;
};
