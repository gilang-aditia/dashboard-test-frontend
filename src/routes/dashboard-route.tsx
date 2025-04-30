import React from "react";
import { Route } from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import ProductList from "../features/halaman-produk";

export default function DashboardRoute() {
  return (
    <Route path="/" element={<DashboardLayout />}>
      <Route path="halamanProduk" element={<ProductList />} />
    </Route>
  );
}
