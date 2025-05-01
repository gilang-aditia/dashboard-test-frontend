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

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No post data found</div>;

  const posts = data.posts;

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

  // data garis
  const lineData = {
    labels: posts.map((post) => `Post ${post.id}`),
    datasets: [
      {
        label: "Reactions",
        data: posts.map((post) => post.reactions),
        borderColor: chartColors[3],
        backgroundColor: chartColors[3] + "20",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // total post penggunsn
  const userPosts = posts.reduce((acc: Record<number, number>, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1;
    return acc;
  }, {});

  // inin posts
  const doughnutData = {
    labels: Object.keys(userPosts).map((userId) => `User ${userId}`),
    datasets: [
      {
        label: "Posts per User",
        data: Object.values(userPosts),
        backgroundColor: chartColors.slice(0, Object.keys(userPosts).length),
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
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Post Reactions Trend
        </h2>
        <Line data={lineData} options={options} />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Posts Distribution by User
        </h2>
        <div className="h-64">
          <Doughnut data={doughnutData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartPosts;
