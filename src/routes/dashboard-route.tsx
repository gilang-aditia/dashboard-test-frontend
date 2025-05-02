import { Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import ProductList from "../features/halaman-produk";
import RecipePage from "../features/halaman-receipes";
import DashboardPages from "../features/halaman-dashboard";
import CartsPage from "../features/halaman-carts";

export default function DashboardRoute() {
  return (
    <Route path="/" element={<DashboardLayout />}>
      {/* Redirect dari "/" ke "/dashboard" */}
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<DashboardPages />} />
      <Route path="halamanProduk" element={<ProductList />} />
      <Route path="halamanrecipes" element={<RecipePage />} />
      <Route path="halamancarts" element={<CartsPage />} />
    </Route>
  );
}
