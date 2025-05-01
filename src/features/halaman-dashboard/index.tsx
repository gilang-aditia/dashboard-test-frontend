import ChartCarts from "./components/chart-carts";
import ChartPosts from "./components/chart-post";
import ChartProducts from "./components/chart-produk";
import ChartRecipes from "./components/chart-recipes";

export default function DashboardPages() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard Analytics</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <ChartProducts />
          <ChartPosts />
        </div>

        <div className="space-y-6">
          <ChartCarts />
          <ChartRecipes />
        </div>
      </div>
    </div>
  );
}
