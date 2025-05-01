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

  if (loading) return <div>Loading carts...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No cart data found</div>;

  const carts = data.carts;

  // Warna untuk chart
  const chartColors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#EC4899",
    "#14B8A6",
    "#F97316",
    "#6366F1",
    "#8B5CF6",
  ];

  // area
  const polarData = {
    labels: carts.map((cart) => `Cart #${cart.id}`),
    datasets: [
      {
        label: "Discounted Total",
        data: carts.map((cart) => cart.discountedTotal),
        backgroundColor: chartColors.slice(0, carts.length),
        borderWidth: 1,
      },
    ],
  };

  // data banding
  const barData = {
    labels: carts.map((cart) => `Cart #${cart.id}`),
    datasets: [
      {
        label: "Total",
        data: carts.map((cart) => cart.total),
        backgroundColor: chartColors[0],
        borderRadius: 6,
      },
      {
        label: "Discounted Total",
        data: carts.map((cart) => cart.discountedTotal),
        backgroundColor: chartColors[2],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $${context.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Cart Values Comparison
        </h2>
        <Bar data={barData} options={options} />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Discounted Total per Cart
        </h2>
        <div className="h-64">
          <PolarArea data={polarData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartCarts;
