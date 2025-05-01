import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiClients";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface ApiResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

interface RecipeParams {
  tag?: string;
  mealType?: string;
  searchQuery?: string;
}

interface RecipeQueryResult {
  recipes: Recipe[];
  total: number;
  tags: string[];
  mealTypes: string[];
}

const fetchRecipes = async (params: RecipeParams): Promise<ApiResponse> => {
  const endpoint = params.searchQuery
    ? `/recipes/search?q=${encodeURIComponent(params.searchQuery)}`
    : "/recipes";

  const response = await apiClient.get<ApiResponse>(endpoint);
  return response;
};

const filterRecipes = (recipes: Recipe[], params: RecipeParams): Recipe[] => {
  let result = [...recipes];

  if (params.tag) {
    result = result.filter((recipe) =>
      recipe.tags.some(
        (tag) => tag.toLowerCase() === params.tag?.toLowerCase(),
      ),
    );
  }

  if (params.mealType) {
    result = result.filter((recipe) =>
      recipe.mealType.some(
        (type) => type.toLowerCase() === params.mealType?.toLowerCase(),
      ),
    );
  }

  return result;
};

const extractUnique = (items: string[]): string[] => [...new Set(items)];

export const useRecipes = (params: RecipeParams) => {
  return useQuery<RecipeQueryResult>({
    queryKey: ["recipes", params],
    queryFn: async () => {
      const { recipes } = await fetchRecipes(params);
      const filteredRecipes = filterRecipes(recipes, params);

      return {
        recipes: filteredRecipes,
        total: filteredRecipes.length,
        tags: extractUnique(recipes.flatMap((r) => r.tags)),
        mealTypes: extractUnique(recipes.flatMap((r) => r.mealType)),
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};
