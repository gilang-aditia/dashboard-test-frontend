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

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No product data found</div>;

  const products = data.products;

  // Warna untuk chart
  const barColors = [
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

  // rating
  const barData = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: "Product Rating",
        data: products.map((p) => p.rating),
        backgroundColor: barColors.slice(0, products.length),
        borderRadius: 6,
      },
    ],
  };

  // kat produk
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
        max: 5,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Product Ratings (Top 5)
        </h2>
        <Bar data={barData} options={options} />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Product Categories
        </h2>
        <div className="h-64">
          <Pie data={pieData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartProducts;
