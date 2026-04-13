import { Package, AlertTriangle, XCircle, AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Charts from "../charts";
import StatCard from "./stateCard";

const API_URL =
       process.env.REACT_APP_API_URL ||
       "https://medialert-backend-tz4c.onrender.com";

const Dashboard = () => {
       const [stats, setStats] = useState({
              totalProducts: 0,
              lowStock: 0,
              expired: 0,
              recentAlerts: [],
       });

       const [loading, setLoading] = useState(true);
       const [revenueData, setRevenueData] = useState([])

       useEffect(() => {
              const fetchDashboard = async () => {
                     const user = JSON.parse(sessionStorage.getItem("user"));
                     const token = user?.storeId;
                     try {


                            if (!token) return;

                            const res = await fetch(`${API_URL}/api/dashboard`, {
                                   headers: {
                                          Authorization: `Bearer ${token}`,
                                   },
                            });

                            if (!res.ok) throw new Error("Failed to fetch");

                            const data = await res.json();
                            // console.log("data", data);

                            setStats(data);
                     } catch (err) {
                            console.error("Dashboard fetch failed", err);
                     } finally {
                            setLoading(false);
                     }
              };

              const fetchMonthlyRevenue = async () => {
                     const user = JSON.parse(sessionStorage.getItem("user"));
                     const userId = user?.token;
                     const storeId = user?.storeId;
                     try {
                            const res = await fetch(`${API_URL}/api/billing/monthly-revenue`, {
                                   method: "GET",
                                   headers: {
                                          "Content-Type": "application/json",
                                          "user-id": userId,
                                          "store-id": storeId,
                                   },
                            });

                            const data = await res.json();
                            // console.log("dar", data);


                            if (!res.ok) {
                                   alert(data.message || "Failed to fetch revenue");
                                   return;
                            }

                            const formattedRevenueData = data.monthlyRevenue.map((item) => {
                                   const [year, month] = item.month.split("-");
                                   const date = new Date(year, month - 1);

                                   return {
                                          ...item,
                                          month: date.toLocaleString("default", {
                                                 month: "short",
                                                 year: "numeric",
                                          }),
                                   };
                            });
                            setRevenueData(formattedRevenueData)
                     } catch (err) {
                            console.error(err);
                            alert("Server error");
                     }
              };
              fetchMonthlyRevenue();
              fetchDashboard();
       }, []);



       if (loading) {
              return (
                     <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500">Loading dashboard...</p>
                     </div>
              );
       }

       return (
              <div className="flex flex-col p-6 gap-6 w-full bg-gray-50">

                     {/* HEADER */}
                     <div>
                            <h1 className="text-3xl font-bold">Dashboard</h1>
                            <p className="text-gray-600">
                                   Welcome back! Here's your pharmacy overview
                            </p>
                     </div>

                     {/* STATS */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <StatCard
                                   title="Total Products"
                                   value={stats.totalProducts}
                                   icon={<Package size={24} />}
                                   color="blue"
                            />

                            <StatCard
                                   title="Low Stock"
                                   value={stats.lowStock}
                                   icon={<AlertTriangle size={24} />}
                                   color="yellow"
                            />

                            <StatCard
                                   title="Expired Items"
                                   value={stats.expired}
                                   icon={<XCircle size={24} />}
                                   color="red"
                            />

                            <StatCard
                                   title="Expired Soon"
                                   value={stats.expiringIn6Months}
                                   icon={<AlertCircle size={24} />}
                                   color="orange"
                            />
                     </div>

                     {/* CHART PLACEHOLDER */}
                     <div>
                            <Charts revenueDatas={revenueData} data="revenue" />

                     </div>

                     {/* RECENT ALERTS */}
                     <div className="bg-white rounded-xl shadow p-4">
                            <h2 className="text-xl font-semibold mb-3">
                                   Recent Alerts
                            </h2>

                            {stats.recentAlerts.length === 0 ? (
                                   <p className="text-gray-500">No alerts 🎉</p>
                            ) : (
                                   <div className="flex flex-col gap-2">
                                          {stats.recentAlerts.map((item) => (
                                                 <div
                                                        key={item._id}
                                                        className="flex justify-between items-center p-4 rounded-lg bg-gray-100"
                                                 >
                                                        <div>
                                                               <p className="font-medium">{item.name}</p>
                                                               <p className="text-sm text-gray-600">
                                                                      Expiry: {item.expiryDate.split("T")[0]}
                                                               </p>
                                                        </div>

                                                        <span
                                                               className={`px-3 py-1 rounded-lg text-sm font-medium ${item.alertType === "out"
                                                                      ? "bg-gray-200 text-gray-800"
                                                                      : item.alertType === "expired"
                                                                             ? "bg-red-100 text-red-600"
                                                                             : item.alertType === "expiring"
                                                                                    ? "bg-orange-100 text-orange-600"
                                                                                    : item.alertType === "low"
                                                                                           ? "bg-yellow-100 text-yellow-600"
                                                                                           : ""
                                                                      }
`}
                                                        >
                                                               {item.alertType === "out"
                                                                      ? "Out of Stock"
                                                                      : item.alertType === "expired"
                                                                             ? "Expired"
                                                                             : item.alertType === "expiring"
                                                                                    ? "Expiry Soon"
                                                                                    : item.alertType === "low"
                                                                                           ? "Low Stock"
                                                                                           : ""}
                                                        </span>
                                                 </div>
                                          ))}
                                   </div>
                            )}
                     </div>
              </div>
       );
};

export default Dashboard;
