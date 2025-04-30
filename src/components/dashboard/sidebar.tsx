import { Aperture } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode;
}

export const Sidebar = ({ isOpen, toggleSidebar, children }: SidebarProps) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-[#242146] text-[#1E293B] shadow-md transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:sticky lg:top-0 lg:z-auto lg:min-h-screen lg:w-64 lg:translate-x-0 xl:w-56`}
    >
      {/* Header section */}
      <div className="flex items-center justify-center gap-2 bg-[#242146] p-4">
        <Aperture className="h-6 w-6 text-violet-500" />
        <span className="text-lg font-semibold tracking-tight text-white">
          Dashboard
        </span>
      </div>

      {/* Scrollable menu section */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">{children}</div>
      </div>
    </aside>
  );
};
