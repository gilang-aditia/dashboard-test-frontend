import React from "react";
import { Routes } from "react-router-dom";
import DashboardRoute from "../routes/dashboard-route";

export default function AppRouter() {
  return (
    <Routes>
      <React.Fragment>{DashboardRoute()}</React.Fragment>
    </Routes>
  );
}
