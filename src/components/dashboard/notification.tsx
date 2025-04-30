import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface NotificationPopoverProps {
  trigger: ReactNode;
  alert: string;
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  trigger,
  alert,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative text-white focus:outline-none">
          {trigger}
          {/* Indikator notifikasi belum dibaca */}
          <span className="absolute top-0 right-0 block h-2 w-2 animate-ping rounded-full bg-red-500 ring-2 ring-white" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end" // memastikan muncul di kanan relatif ke trigger
        sideOffset={8} // beri jarak kecil dari icon bell
        className="w-80 rounded-lg bg-white p-0 shadow-lg ring-1 ring-black/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <span className="text-xs font-semibold text-gray-500">
            {alert} (0)
          </span>
          <button className="text-xs font-medium text-blue-500 hover:underline">
            Baca Semua
          </button>
        </div>

        {/* Notifikasi kosong */}
        <div className="max-h-64 overflow-y-auto px-4 py-6 text-sm text-gray-400">
          Tidak ada notifikasi
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3">
          <a href="#" className="text-xs text-gray-500 hover:underline">
            0 Notifikasi lainnya
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
