// Import useDAshboardcarts

import { Box, File, Utensils } from "lucide-react";
import {
  useDAshboardProduct,
  useDAshboardcarts,
  useDAshboardPosts,
  useDAshboardRecipes,
} from "../hook/useTotal";

export default function CardTotal() {
  const { data: productData, isLoading: isProductLoading } =
    useDAshboardProduct() as {
      data: { total: number } | null;
      isLoading: boolean;
    };
  const { data: cartsData, isLoading: isCartsLoading } =
    useDAshboardcarts() as {
      data: { total: number } | null;
      isLoading: boolean;
    }; // Define type for cartsData
  const { data: postsData, isLoading: isPostsLoading } =
    useDAshboardPosts() as {
      data: { total: number } | null;
      isLoading: boolean;
    }; // Define type for postsData
  const { data: recipesData, isLoading: isRecipesLoading } =
    useDAshboardRecipes() as {
      data: { total: number } | null;
      isLoading: boolean;
    };

  const cards = [
    {
      title: "Total Products",
      count: isProductLoading ? "Loading..." : (productData?.total ?? 0),
      icon: <Box className="text-3xl text-blue-500" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Recipes",
      count: isRecipesLoading ? "Loading..." : (recipesData?.total ?? 0),
      icon: <Utensils className="text-3xl text-green-500" />,
      bg: "bg-green-100",
    },
    {
      title: "Total Posts",
      count: isPostsLoading ? "Loading..." : (postsData?.total ?? 0),
      icon: <File className="text-3xl text-orange-500" />,
      bg: "bg-orange-100",
    },
    {
      title: "Total Carts", // Menambahkan kartu untuk total carts
      count: isCartsLoading ? "Loading..." : (cartsData?.total ?? 0),
      icon: <Box className="text-3xl text-red-500" />,
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div key={index} className={`rounded-xl p-4 shadow ${card.bg}`}>
          <div className="flex items-center gap-4">
            {card.icon}
            <div>
              <p className="text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold">{card.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
