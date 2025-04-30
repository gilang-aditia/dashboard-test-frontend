interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  children: React.ReactNode;
}

export const Sidebar = ({ isOpen, toggleSidebar, children }: SidebarProps) => {
  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-auto left-0 z-20 flex h-full w-64 flex-col bg-[#015232] shadow-lg transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:min-h-screen lg:translate-x-0 xl:w-56`}
    >
      {/* Header section */}
      <div className="flex items-center justify-center p-3">
        <p className="text-base font-bold text-white">Dashboard</p>
      </div>

      {/* Scrollable menu section */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">{children}</div>
      </div>
    </aside>
  );
};
