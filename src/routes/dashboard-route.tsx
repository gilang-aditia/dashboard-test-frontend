import React from "react";
import { Route } from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import ProductList from "../features/halaman-produk";
import RecipePage from "../features/halaman-receipes";
import DashboardPages from "../features/halaman-dashboard";

export default function DashboardRoute() {
  return (
    <Route path="/" element={<DashboardLayout />}>
      <Route path="dashboard" element={<DashboardPages />} />
      <Route path="halamanProduk" element={<ProductList />} />
      <Route path="halamanrecipes" element={<RecipePage />} />
    </Route>
  );
}
