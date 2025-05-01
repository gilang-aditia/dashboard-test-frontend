import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Dummy product rating data
const products = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    rating: 4.94,
  },
  {
    id: 2,
    title: "Maybelline Fit Me Foundation",
    rating: 4.5,
  },
  {
    id: 3,
    title: "L'Oreal Lipstick Rouge",
    rating: 4.8,
  },
  {
    id: 4,
    title: "Garnier Micellar Water",
    rating: 4.2,
  },
  {
    id: 5,
    title: "Wardah BB Cream",
    rating: 4.7,
  },
];

// Array warna-warni
const barColors = [
  "#EF4444", // merah
  "#F59E0B", // kuning
  "#10B981", // hijau
  "#3B82F6", // biru
  "#8B5CF6", // ungu
];

const data = {
  labels: products.map((p) => p.title),
  datasets: [
    {
      label: "Rating Produk",
      data: products.map((p) => p.rating),
      backgroundColor: barColors,
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
          return `Rating: ${context.raw}`;
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

export default function ChartProduct() {
  return (
    <div className="">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Rating Produk (Top 5)
        </h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
