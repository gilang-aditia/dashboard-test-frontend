import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// Dummy carts data
const dummyCarts = [
  {
    id: 1,
    total: 4794.8,
    discountedTotal: 4288.95,
  },
  {
    id: 2,
    total: 2387.0,
    discountedTotal: 2104.56,
  },
  {
    id: 3,
    total: 1950.5,
    discountedTotal: 1820.0,
  },
  {
    id: 4,
    total: 1567.4,
    discountedTotal: 1450.2,
  },
  {
    id: 5,
    total: 3980.2,
    discountedTotal: 3500.0,
  },
];

const data = {
  labels: dummyCarts.map((cart) => `Cart #${cart.id}`),
  datasets: [
    {
      label: "Discounted Total",
      data: dummyCarts.map((cart) => cart.discountedTotal),
      backgroundColor: [
        "#F87171", // merah
        "#FBBF24", // kuning
        "#34D399", // hijau
        "#60A5FA", // biru
        "#A78BFA", // ungu
      ],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          return `Total: $${context.raw}`;
        },
      },
    },
  },
};

export default function ChartCarts() {
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        Discounted Total per Cart
      </h2>
      <PolarArea data={data} options={options} />
    </div>
  );
}
