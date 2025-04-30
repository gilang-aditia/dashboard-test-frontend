import { BellIcon, MenuIcon } from "lucide-react";
import NotificationPopover from "./notification";
import { HeaderProfil } from "./header-profile";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#070b1d] px-4 py-3 text-white shadow-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[2000px] items-center justify-between">
        {/* Sidebar Toggle Button (hidden on large screens) */}
        <button
          onClick={toggleSidebar}
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus:ring-2 focus:ring-white focus:outline-none lg:hidden"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Right Section: Notification and Profile */}
        <div className="ml-auto flex items-center gap-4">
          <NotificationPopover
            trigger={
              <button
                className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus:ring-2 focus:ring-white focus:outline-none"
                aria-label="View notifications"
              >
                <BellIcon className="h-6 w-6" />
              </button>
            }
            alert="ADA NOTIFIKASI"
          />

          <HeaderProfil />
        </div>
      </div>
    </header>
  );
}
