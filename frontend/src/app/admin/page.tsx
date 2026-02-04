"use client";

import Dashboard from "@/components/admin/dashboard.tsx/dashboard";
import Forecast from "@/components/admin/Forecast/Forecast";
import Product from "@/components/admin/products/product";
import Stoke from "@/components/admin/stock/stoke";
import Expiry from "@/components/admin/expiry/expiry";
import TopNavBar from "@/components/nav/topNavBar/topNavBar";
import {
  AlertTriangle,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  TrendingUp,
  Truck,
  User,
  Warehouse,
} from "lucide-react";
import { useState } from "react";
import Staff from "@/components/admin/staff/Staff";

export default function Page() {
  const [CurrentComponent, setCurrentComponent] = useState(() => Dashboard);

  const sideNav = [
    { name: "Dashboard", icon: LayoutDashboard, compo: Dashboard },
    { name: "Product", icon: Package, compo: Product },
    { name: "Stock", icon: Warehouse, compo: Stoke },
    { name: "Expiry Alert", icon: AlertTriangle, compo: Expiry },
    { name: "Sales Forecasting", icon: TrendingUp, compo: Forecast },
    { name: "Suppliers", icon: Truck, compo: Product },
    { name: "Staff Management", icon: User, compo: Staff },
    { name: "Reports", icon: FileText, compo: Product },
    { name: "Settings", icon: Settings, compo: Product },
  ];

  return (
    <main className="flex flex-col h-screen w-full overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full h-16 z-50">
        <TopNavBar />
      </nav>

      <div className="flex pt-16 h-full">
        {/* Sidebar */}
        <aside className="fixed top-16 left-0 w-64 max-lg:w-56 max-md:w-20 max-sm:hidden h-[calc(100vh-4rem)] border-r bg-white">
          <ul className="flex flex-col px-3 py-2 h-full overflow-y-auto">
            {sideNav.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setCurrentComponent(() => item.compo)}
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-200"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-lg font-medium max-md:hidden">
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <section className="ml-64 max-lg:ml-56 max-md:ml-20 flex-1 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
          <CurrentComponent />
        </section>
      </div>
    </main>
  );
}
