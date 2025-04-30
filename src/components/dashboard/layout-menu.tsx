import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface MenuProps {
  label: string;
  href: string;
  icon: ReactNode;
}

export const Menu = ({ label, href, icon }: MenuProps) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `mt-1 flex items-center space-y-2 rounded p-1 py-2 text-xs font-medium transition-all duration-300 ${isActive ? "bg-white text-black" : "text-white hover:bg-white hover:text-black"}`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
};
