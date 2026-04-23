import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/Navbar';
import {
  AlertTriangle,
  Building,
  LayoutDashboard,
  Package,
} from "lucide-react";
import Dashboard from '../../components/Dashboard/Dashboard';
import Expiry from '../../components/expiry/expiry';
import Billing from '../../components/billing/billing';
import Product from '../../components/prooduct/Stock';

const Admin = () => {
  const sideNav = [
    { name: "Dashboard", icon: LayoutDashboard, compo: Dashboard },
    { name: "Product", icon: Package, compo: Product },
    { name: "Expiry Alert", icon: AlertTriangle, compo: Expiry },
    { name: "Billing", icon: Building, compo: Billing },
  ];

  const getSavedComponent = () => {
    const saved = sessionStorage.getItem("adminActiveMenu");
    const found = sideNav.find((item) => item.name === saved);
    return found || sideNav[0];
  };

  const [activeMenu, setActiveMenu] = useState(getSavedComponent().name);
  const [CurrentComponent, setCurrentComponent] = useState(() => getSavedComponent().compo);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("adminActiveMenu", activeMenu);
  }, [activeMenu]);

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    setCurrentComponent(() => item.compo);
    setIsSidebarOpen(false);
  };

  return (
    <main className="flex flex-col h-screen w-full overflow-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-white shadow">
        <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </nav>

      <div className="flex pt-16 h-full">

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}


        {/* Sidebar */}
        <aside
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r z-40 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block`}
        >
          <ul className="flex flex-col px-3 py-2 h-full overflow-y-auto">
            {sideNav.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 transition
                    ${activeMenu === item.name
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-gray-200 text-gray-700"
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-lg font-medium md:block">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <section className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 md:ml-64">
          <CurrentComponent />
        </section>
      </div>
    </main>
  );
};

export default Admin;