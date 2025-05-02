import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import CardTotal from "./components/card-total";
import ChartCarts from "./components/chart-carts";
import ChartPosts from "./components/chart-post";
import ChartProducts from "./components/chart-produk";
import ChartRecipes from "./components/chart-recipes";

export default function DashboardPages() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Dashboard{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Analytics
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Real-time data visualization
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="d rounded-full bg-white px-3 py-1 text-xs font-medium text-white shadow-sm dark:bg-gray-700">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <div>
        <CardTotal />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <Card className="rounded-2xl border-0 bg-white p-5 shadow-lg">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                Product Analytics
              </CardTitle>
            </CardHeader>
            <ChartProducts />
          </Card>

          <Card className="rounded-2xl border-0 bg-white p-5 shadow-lg">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="d flex items-center gap-2 text-lg font-semibold text-gray-700">
                <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                Posts Engagement
              </CardTitle>
            </CardHeader>
            <ChartPosts />
          </Card>
        </div>

        <div className="space-y-5">
          <Card className="rounded-2xl border-0 bg-white p-5 shadow-lg">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="d flex items-center gap-2 text-lg font-semibold text-gray-700">
                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                Shopping Carts
              </CardTitle>
            </CardHeader>
            <ChartCarts />
          </Card>

          <Card className="rounded-2xl border-0 bg-white p-5 shadow-lg">
            <CardHeader className="p-0 pb-3">
              <CardTitle className="d flex items-center gap-2 text-lg font-semibold text-gray-700">
                <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                Recipes Analysis
              </CardTitle>
            </CardHeader>
            <ChartRecipes />
          </Card>
        </div>
      </div>
    </div>
  );
}
