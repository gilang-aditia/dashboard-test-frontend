import ChartCarts from "./components/chart-carts";
import ChartProduct from "./components/chart-produk";

export default function DashboardPages() {
  return (
    <div className="">
      <h1 className="mb-6 text-2xl font-bold">Dashboard Produk</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChartProduct />
        <ChartCarts />
        <ChartProduct />
        <ChartProduct />
      </div>
    </div>
  );
}
