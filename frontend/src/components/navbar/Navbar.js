import {
  Bell,
  BriefcaseMedical,
  Menu,
  Search,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavBar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="h-16 flex items-center justify-between px-5 border-b border-gray-200 bg-white">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Logo (always visible on md+) */}
        <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <BriefcaseMedical className="h-6 w-6 text-white" />
        </div>

        {/* Text */}
        <div className="hidden md:block">
          <h1 className="text-lg font-bold text-gray-900">MediAlert</h1>
          <p className="text-xs text-gray-500">Smart Pharmacy</p>
        </div>

        {/* Menu icon for mobile */}
        <div className="md:hidden">
          <Menu onClick={toggleSidebar} className="cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 px-5 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="search"
            placeholder="Search products..."
            className="w-full h-10 pl-10 pr-3 rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">

        {/* Notification */}
        <button className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User className="h-5 w-5" />
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "Guest"}
              </p>
            </div>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg z-50">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;