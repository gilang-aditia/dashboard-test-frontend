import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
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
);

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

const ChartProducts = () => {
  const { data, loading, error } = useApiData<{ products: Product[] }>(
    "products?limit=5",
  );

  if (loading)
    return (
      <div className="space-y-6 p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
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
        No product data found
      </div>
    );

  const products = data.products;

  // Warna untuk dark/light mode
  const barColors = [
    "rgba(99, 102, 241, 0.8)", // indigo
    "rgba(139, 92, 246, 0.8)", // violet
    "rgba(20, 184, 166, 0.8)", // teal
    "rgba(245, 158, 11, 0.8)", // amber
    "rgba(239, 68, 68, 0.8)", // red
  ];

  const hoverBarColors = [
    "rgba(99, 102, 241, 1)",
    "rgba(139, 92, 246, 1)",
    "rgba(20, 184, 166, 1)",
    "rgba(245, 158, 11, 1)",
    "rgba(239, 68, 68, 1)",
  ];

  // Data untuk bar chart
  const barData = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: "Product Rating",
        data: products.map((p) => p.rating),
        backgroundColor: barColors,
        borderColor: barColors.map((color) => color.replace("0.8", "1")),
        borderWidth: 1,
        borderRadius: 8,
        hoverBackgroundColor: hoverBarColors,
      },
    ],
  };

  // Data untuk pie chart
  const categories = [...new Set(products.map((p) => p.category))];
  const categoryCounts = categories.map((category) => ({
    category,
    count: products.filter((p) => p.category === category).length,
  }));

  const pieData = {
    labels: categoryCounts.map((c) => c.category),
    datasets: [
      {
        label: "Products by Category",
        data: categoryCounts.map((c) => c.count),
        backgroundColor: barColors.slice(0, categoryCounts.length),
        borderColor: "rgba(30, 41, 59, 1)", // slate-800
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
            weight: "bold" as const,
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
        max: 5,
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
          Product Ratings (Top 5)
        </h3>
        <Bar data={barData} options={options} />
      </div>

      <div className="h-[350px]">
        <h3 className="mt-4 mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Product Categories
        </h3>
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default ChartProducts;
