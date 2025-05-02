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
import { Skeleton } from "../../../components/ui/skeleton";

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

  if (loading)
    return (
      <div className="space-y-6 p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="mx-4 my-6 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-200">
        Error: {error}
      </div>
    );

  if (!data)
    return (
      <div className="mx-4 my-6 rounded-lg bg-amber-100 p-4 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
        No recipe data found
      </div>
    );

  const recipes = data.recipes;

  // Warna modern untuk chart
  const chartColors = [
    "rgba(99, 102, 241, 0.8)", // indigo
    "rgba(139, 92, 246, 0.8)", // violet
    "rgba(20, 184, 166, 0.8)", // teal
    "rgba(245, 158, 11, 0.8)", // amber
    "rgba(239, 68, 68, 0.8)", // red
    "rgba(14, 165, 233, 0.8)", // sky
  ];

  // Data untuk rating resep
  const ratingData = {
    labels: recipes.map((r) => r.name),
    datasets: [
      {
        label: "Recipe Rating",
        data: recipes.map((r) => r.rating),
        backgroundColor: chartColors,
        borderColor: chartColors.map((color) => color.replace("0.8", "1")),
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // Data untuk waktu persiapan vs memasak
  const timeData = {
    labels: recipes.map((r) => r.name),
    datasets: [
      {
        label: "Prep Time (minutes)",
        data: recipes.map((r) => r.prepTimeMinutes),
        backgroundColor: "rgba(99, 102, 241, 0.8)", // indigo
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
      {
        label: "Cook Time (minutes)",
        data: recipes.map((r) => r.cookTimeMinutes),
        backgroundColor: "rgba(20, 184, 166, 0.8)", // teal
        borderColor: "rgba(20, 184, 166, 1)",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // Data untuk pie chart (distribusi kesulitan)
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
        borderColor: "rgba(30, 41, 59, 0.8)", // slate-800
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#64748b", // slate-500
          font: {
            weight: 500,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#0f172a", // slate-900
        titleColor: "#e2e8f0", // slate-200
        bodyColor: "#e2e8f0",
        borderColor: "#1e293b", // slate-800
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
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
        grid: {
          color: "rgba(226, 232, 240, 0.5)", // slate-200
        },
        ticks: {
          color: "#64748b", // slate-500
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b", // slate-500
        },
      },
    },
  };

  return (
    <div className="space-y-6 p-4">
      <div className="h-[350px]">
        <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Top Recipes by Rating
        </h3>
        <Bar
          data={ratingData}
          options={{
            ...options,
            scales: {
              y: {
                beginAtZero: true,
                max: 5,
                grid: {
                  color: "rgba(226, 232, 240, 0.5)",
                },
                ticks: {
                  color: "#64748b",
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#64748b",
                },
              },
            },
          }}
        />
      </div>

      <div className="mt-16 h-[350px]">
        <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Time Comparison (minutes)
        </h3>
        <Bar data={timeData} options={options} />
      </div>

      <div className="mt-16 h-[350px]">
        <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Difficulty Distribution
        </h3>
        <Pie data={difficultyData} options={options} />
      </div>
    </div>
  );
};

export default ChartRecipes;
