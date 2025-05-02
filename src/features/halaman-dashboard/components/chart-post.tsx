import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import useApiData from "../hook/useApiAll";
import { Skeleton } from "../../../components/ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
);

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

const ChartPosts = () => {
  const { data, loading, error } = useApiData<{ posts: Post[] }>(
    "posts?limit=8",
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
        No post data found
      </div>
    );

  const posts = data.posts;

  // Warna modern untuk chart
  const chartColors = [
    "rgba(99, 102, 241, 0.8)", // indigo
    "rgba(139, 92, 246, 0.8)", // violet
    "rgba(20, 184, 166, 0.8)", // teal
    "rgba(245, 158, 11, 0.8)", // amber
    "rgba(239, 68, 68, 0.8)", // red
    "rgba(14, 165, 233, 0.8)", // sky
    "rgba(236, 72, 153, 0.8)", // pink
    "rgba(249, 115, 22, 0.8)", // orange
  ];

  // Data untuk line chart
  const lineData = {
    labels: posts.map((post) => `Post ${post.id}`),
    datasets: [
      {
        label: "Reactions",
        data: posts.map((post) => post.reactions),
        borderColor: "rgba(99, 102, 241, 1)", // indigo
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointHitRadius: 20,
      },
    ],
  };

  // Data untuk doughnut chart
  const userPosts = posts.reduce((acc: Record<number, number>, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(userPosts).map((userId) => `User ${userId}`),
    datasets: [
      {
        label: "Posts per User",
        data: Object.values(userPosts),
        backgroundColor: chartColors.slice(0, Object.keys(userPosts).length),
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
          Post Reactions Trend
        </h3>
        <Line data={lineData} options={options} />
      </div>

      <div className="mt-16 h-[350px]">
        <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          Posts Distribution by User
        </h3>
        <Doughnut data={doughnutData} options={options} />
      </div>
    </div>
  );
};

export default ChartPosts;
