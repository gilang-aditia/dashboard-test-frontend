import { useState } from "react";
import { Header } from "../components/dashboard/header";
import { Sidebar } from "../components/dashboard/sidebar";
import DashboardMenu from "../components/dashboard/dashboard-menu";
import BackComponent from "../components/ui/back-component";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  isCentered?: boolean;
}

export const DashboardLayout = (props: LayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex md:min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
          <DashboardMenu />
        </Sidebar>

        {/*  content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
          <BackComponent />
          {props.isCentered ? (
            <div className="m-auto max-w-2xl bg-white">
              <Outlet />
            </div>
          ) : (
            <div>
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
