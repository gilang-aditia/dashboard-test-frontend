import { Clock, Utensils, Star, Flame, Search, Filter } from "lucide-react";
import { useState } from "react";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Recipe, RecipeQueryResult, useRecipes } from "../hook/useRecipe";

const queryClient = new QueryClient();

// Komponen-komponen kecil
const StatItem = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => (
  <div className="flex flex-col items-center">
    {icon}
    <span className="text-xs">{value}</span>
  </div>
);

const Tag = ({ tag }: { tag: string }) => (
  <span className="bg-secondary rounded-full px-2 py-1 text-xs capitalize">
    {tag.toLowerCase()}
  </span>
);

const RecipeStats = ({ recipe }: { recipe: Recipe }) => (
  <div className="mb-4 grid grid-cols-3 gap-2">
    <StatItem
      icon={<Clock className="h-5 w-5" />}
      value={`${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min`}
    />
    <StatItem
      icon={<Flame className="h-5 w-5" />}
      value={`${recipe.caloriesPerServing} kcal`}
    />
    <StatItem
      icon={<Utensils className="h-5 w-5" />}
      value={`${recipe.servings} servings`}
    />
  </div>
);

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <div className="overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
    <img
      src={recipe.image}
      alt={recipe.name}
      className="h-48 w-full object-cover"
      loading="lazy"
    />
    <div className="p-4">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-semibold">{recipe.name}</h3>
        <div className="bg-primary/10 flex items-center rounded-full px-2 py-1">
          <Star className="mr-1 h-4 w-4 text-yellow-500" />
          <span className="text-sm">{recipe.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="text-muted-foreground mb-3 flex items-center text-sm">
        <Utensils className="mr-1 h-4 w-4" />
        <span className="capitalize">{recipe.cuisine.toLowerCase()}</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {recipe.tags.slice(0, 3).map((tag: string) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>

      <RecipeStats recipe={recipe} />
    </div>
  </div>
);

const FilterButton = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <Button variant={active ? "default" : "outline"} size="sm" onClick={onClick}>
    {label}
  </Button>
);

const LoadingSpinner = () => (
  <div className="flex h-64 items-center justify-center">
    <div className="border-primary h-12 w-12 animate-spin rounded-full border-2 border-t-2 border-b-2"></div>
  </div>
);

const ErrorDisplay = ({ message }: { message?: string }) => (
  <div className="rounded border border-red-200 bg-red-50 p-4 text-red-600">
    <h3 className="font-bold">Failed to load recipes</h3>
    <p className="mt-2">{message || "An unknown error occurred"}</p>
  </div>
);

const NoDataDisplay = () => (
  <div className="rounded border border-yellow-200 bg-yellow-50 p-4 text-yellow-600">
    <h3 className="font-bold">No recipe data available</h3>
  </div>
);

const SearchBar = ({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}) => (
  <div className="relative flex-1">
    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
    <Input
      placeholder="Search recipes..."
      className="pl-9"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

const FilterSection = ({
  data,
  selectedTag,
  selectedMealType,
  onTagSelect,
  onMealTypeSelect,
  onResetFilters,
}: {
  data: RecipeQueryResult;
  selectedTag: string | null;
  selectedMealType: string | null;
  onTagSelect: (tag: string | null) => void;
  onMealTypeSelect: (mealType: string | null) => void;
  onResetFilters: () => void;
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground text-sm">
        Total Recipes: <span className="font-medium">{data.total}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onResetFilters}
        className="text-primary"
      >
        Reset Filters
      </Button>
    </div>

    <div className="flex flex-wrap gap-2">
      <FilterButton
        active={!selectedTag}
        label="All Tags"
        onClick={() => onTagSelect(null)}
      />
      {data.tags.map((tag: string) => (
        <FilterButton
          key={tag}
          active={selectedTag === tag}
          label={tag}
          onClick={() => onTagSelect(tag)}
        />
      ))}
    </div>

    <div className="flex flex-wrap gap-2">
      <FilterButton
        active={!selectedMealType}
        label="All Meals"
        onClick={() => onMealTypeSelect(null)}
      />
      {data.mealTypes.map((mealType: string) => (
        <FilterButton
          key={mealType}
          active={selectedMealType === mealType}
          label={mealType}
          onClick={() => onMealTypeSelect(mealType)}
        />
      ))}
    </div>
  </div>
);

const RecipeGrid = ({ recipes }: { recipes: Recipe[] }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {recipes.map((recipe: Recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ))}
  </div>
);

const RecipeContainer = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useRecipes({
    tag: selectedTag || undefined,
    mealType: selectedMealType || undefined,
    searchQuery: searchQuery || undefined,
  });

  const handleResetFilters = () => {
    setSelectedTag(null);
    setSelectedMealType(null);
    setSearchQuery("");
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!data?.recipes?.length) return <NoDataDisplay />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {data && (
        <FilterSection
          data={data}
          selectedTag={selectedTag}
          selectedMealType={selectedMealType}
          onTagSelect={setSelectedTag}
          onMealTypeSelect={setSelectedMealType}
          onResetFilters={handleResetFilters}
        />
      )}

      <RecipeGrid recipes={data.recipes} />
    </div>
  );
};

export default function RecipeContainerWithProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecipeContainer />
    </QueryClientProvider>
  );
}
