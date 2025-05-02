import { PolarArea, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import useApiData from "../hook/useApiAll";
import { Skeleton } from "../../../components/ui/skeleton";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

interface Cart {
  id: number;
  userId: number;
  products: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
  }[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
}

const ChartCarts = () => {
  const { data, loading, error } = useApiData<{ carts: Cart[] }>(
    "carts?limit=5",
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
        No cart data found
      </div>
    );

  const carts = data.carts;

  // Warna modern untuk chart
  const chartColors = [
    "rgba(99, 102, 241, 0.7)", // indigo
    "rgba(139, 92, 246, 0.7)", // violet
    "rgba(20, 184, 166, 0.7)", // teal
    "rgba(245, 158, 11, 0.7)", // amber
    "rgba(239, 68, 68, 0.7)", // red
  ];

  // Data untuk polar area chart
  const polarData = {
    labels: carts.map((cart) => `Cart #${cart.id}`),
    datasets: [
      {
        label: "Discounted Total",
        data: carts.map((cart) => cart.discountedTotal),
        backgroundColor: chartColors,
        borderColor: "rgba(30, 41, 59, 0.8)", // slate-800
        borderWidth: 1,
      },
    ],
  };

  // Data untuk bar chart
  const barData = {
    labels: carts.map((cart) => `Cart #${cart.id}`),
    datasets: [
      {
        label: "Total",
        data: carts.map((cart) => cart.total),
        backgroundColor: "rgba(99, 102, 241, 0.8)", // indigo
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(99, 102, 241, 1)",
      },
      {
        label: "Discounted Total",
        data: carts.map((cart) => cart.discountedTotal),
        backgroundColor: "rgba(20, 184, 166, 0.8)", // teal
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(20, 184, 166, 1)",
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
            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
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
          callback: function (value: any) {
            return `$${value}`;
          },
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
          Cart Values Comparison
        </h3>
        <Bar data={barData} options={options} />
      </div>

      <div className="mt-16 h-[350px]">
        <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Discounted Total per Cart
        </h3>
        <PolarArea data={polarData} options={options} />
      </div>
    </div>
  );
};

export default ChartCarts;
