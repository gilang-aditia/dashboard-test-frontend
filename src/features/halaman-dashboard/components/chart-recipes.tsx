import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  Title,
} from "chart.js";
import useApiData from "../hook/useApiAll";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  Title,
);

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
  rating: number;
  reviewCount: number;
}

const ChartRecipes = () => {
  const { data, loading, error } = useApiData<{ recipes: Recipe[] }>(
    "recipes?limit=6",
  );

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No recipe data found</div>;

  const recipes = data.recipes;

  // Warna untuk chart
  const chartColors = [
    "#EF4444",
    "#F59E0B",
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#6366F1",
    "#8B5CF6",
  ];

  // rating resep
  const ratingData = {
    labels: recipes.map((r) => r.name),
    datasets: [
      {
        label: "Recipe Rating",
        data: recipes.map((r) => r.rating),
        backgroundColor: chartColors.slice(0, recipes.length),
        borderRadius: 6,
      },
    ],
  };

  // waktu baut masak sama buat resep
  const timeData = {
    labels: recipes.map((r) => r.name),
    datasets: [
      {
        label: "Prep Time (minutes)",
        data: recipes.map((r) => r.prepTimeMinutes),
        backgroundColor: chartColors[0],
        borderRadius: 6,
      },
      {
        label: "Cook Time (minutes)",
        data: recipes.map((r) => r.cookTimeMinutes),
        backgroundColor: chartColors[2],
        borderRadius: 6,
      },
    ],
  };

  const difficultyCounts = recipes.reduce(
    (acc: Record<string, number>, recipe) => {
      acc[recipe.difficulty] = (acc[recipe.difficulty] || 0) + 1;
      return acc;
    },
    {},
  );

  const difficultyData = {
    labels: Object.keys(difficultyCounts),
    datasets: [
      {
        label: "Recipes by Difficulty",
        data: Object.values(difficultyCounts),
        backgroundColor: chartColors.slice(
          0,
          Object.keys(difficultyCounts).length,
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">Recipe Ratings</h2>
        <Bar
          data={ratingData}
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                ...options.plugins.title,
                text: "Top Recipes by Rating",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 5,
              },
            },
          }}
        />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Preparation vs Cooking Time
        </h2>
        <Bar
          data={timeData}
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              title: {
                ...options.plugins.title,
                text: "Time Comparison (minutes)",
              },
            },
          }}
        />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Recipes by Difficulty Level
        </h2>
        <div className="h-64">
          <Pie
            data={difficultyData}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                title: {
                  ...options.plugins.title,
                  text: "Difficulty Distribution",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartRecipes;
