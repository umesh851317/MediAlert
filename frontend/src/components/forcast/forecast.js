import React, { useEffect, useMemo, useState } from "react";
import {
       Package,
       TrendingUp,
       TrendingDown,
       Search,
} from "lucide-react";
import SummaryCard from "./SummaryCard";


const API_URL =
       process.env.REACT_APP_API_URL ||
       "https://medialert-backend-tz4c.onrender.com";


const Forecast = () => {
       const [data, setData] = useState([]);
       const [loading, setLoading] = useState(true);
       const [search, setSearch] = useState("");

       useEffect(() => {
              const fetchForecast = async () => {
                     const user = JSON.parse(sessionStorage.getItem("user"));
                     const userId = user?.token;
                     const storeId = user?.storeId;
                     try {
                            const res = await fetch(`${API_URL}/api/forecast`, {
                                   headers: {
                                          "user-id": userId,
                                          "store-id": storeId,
                                   },
                            });

                            const result = await res.json();

                            // Safe handling for array / object response
                            setData(Array.isArray(result) ? result : result.data || []);
                     } catch (err) {
                            console.error("Failed to fetch forecast", err);
                     } finally {
                            setLoading(false);
                     }
              };

              fetchForecast();
       }, []);

       const filtered = useMemo(() => {
              return data.filter((item) =>
                     item.name?.toLowerCase().includes(search.toLowerCase())
              );
       }, [search, data]);

       // Better movement logic
       const fastMoving = data.filter(
              (item) => item.growthRate > 10 || item.avgMonthlySales >= 50
       ).length;

       const slowMoving = data.filter(
              (item) => item.growthRate <= 0 || item.avgMonthlySales < 20
       ).length;

       const reorderNeeded = data.filter((item) => item.reorderQty > 0).length;

       return (
              <div className="flex flex-col p-6 gap-6 w-full bg-gray-50 min-h-screen">
                     {/* HEADER */}
                     <div>
                            <h1 className="text-4xl font-bold">Sales Forecasting</h1>
                            <p className="text-gray-600">
                                   Demand prediction & reorder planning
                            </p>
                     </div>

                     {/* SUMMARY CARDS */}
                     <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
                            <SummaryCard
                                   title="Expected Reorder Items"
                                   value={reorderNeeded}
                                   icon={<Package />}
                                   color="blue"
                            />
                            <SummaryCard
                                   title="Fast Moving"
                                   value={fastMoving}
                                   icon={<TrendingUp />}
                                   color="green"
                            />
                            <SummaryCard
                                   title="Slow Moving"
                                   value={slowMoving}
                                   icon={<TrendingDown />}
                                   color="red"
                            />
                     </div>

                     {/* TABLE */}
                     <div className="bg-white rounded-xl shadow overflow-hidden">
                            <div className="flex justify-between items-center p-4 border-b max-sm:flex-col max-sm:items-start gap-3">
                                   <h2 className="text-lg font-semibold">Product Forecast</h2>

                                   <div className="relative w-full sm:w-72">
                                          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                          <input
                                                 type="text"
                                                 placeholder="Search product..."
                                                 value={search}
                                                 onChange={(e) => setSearch(e.target.value)}
                                                 className="pl-9 pr-3 py-2 border rounded-lg outline-none w-full"
                                          />
                                   </div>
                            </div>

                            {loading ? (
                                   <p className="p-6 text-center text-gray-500">Loading forecast...</p>
                            ) : (
                                   <div className="overflow-x-auto">
                                          <table className="w-full min-w-[1000px]">
                                                 <thead className="bg-gray-100">
                                                        <tr>
                                                               <th className="px-6 py-3 text-left">Product</th>
                                                               <th className="px-6 py-3 text-left">Category</th>
                                                               <th className="px-6 py-3 text-center">Current Stock</th>
                                                               <th className="px-6 py-3 text-center">Avg Monthly Sales</th>
                                                               <th className="px-6 py-3 text-center">Predicted Demand</th>
                                                               <th className="px-6 py-3 text-center">Growth %</th>
                                                               <th className="px-6 py-3 text-center">Coverage (Days)</th>
                                                               <th className="px-6 py-3 text-center">Reorder Level</th>
                                                               <th className="px-6 py-3 text-center">Reorder Qty</th>
                                                        </tr>
                                                 </thead>

                                                 <tbody >
                                                        {filtered.length > 0 ? (
                                                               filtered.map((item) => (
                                                                      <tr
                                                                             key={item.productId}
                                                                             className="border-t hover:bg-gray-50"
                                                                      >
                                                                             <td className="px-6 py-3 font-medium">{item.name}</td>

                                                                             <td className="px-6 py-3">{item.category}</td>

                                                                             <td className="px-6 py-3 text-center">
                                                                                    {item.currentStock}
                                                                             </td>

                                                                             <td className="px-6 py-3 text-center">
                                                                                    {item.avgMonthlySales}
                                                                             </td>

                                                                             <td className="px-6 py-3 text-center">
                                                                                    {item.predictedDemand}
                                                                             </td>

                                                                             <td className="px-6 py-3 text-center">
                                                                                    <span
                                                                                           className={`font-semibold ${item.growthRate > 0
                                                                                                  ? "text-green-600"
                                                                                                  : item.growthRate < 0
                                                                                                         ? "text-red-600"
                                                                                                         : "text-gray-600"
                                                                                                  }`}
                                                                                    >
                                                                                           {item.growthRate}%
                                                                                    </span>
                                                                             </td>

                                                                             <td className="px-6 py-3 text-center">
                                                                                    <span
                                                                                           className={`font-medium ${item.coverageDays < 15
                                                                                                  ? "text-red-600"
                                                                                                  : item.coverageDays <= 30
                                                                                                         ? "text-yellow-600"
                                                                                                         : "text-green-600"
                                                                                                  }`}
                                                                                    >
                                                                                           {item.coverageDays} days
                                                                                    </span>
                                                                             </td>

                                                                             <td className="px-6 py-3 text-center">
                                                                                    {item.reorderLevel}
                                                                             </td>

                                                                             <td className="px-6 py-3 text-center">
                                                                                    <span
                                                                                           className={`px-3 py-1 rounded-lg text-sm font-semibold ${item.reorderQty > 0
                                                                                                  ? "bg-red-100 text-red-600"
                                                                                                  : "bg-green-100 text-green-600"
                                                                                                  }`}
                                                                                    >
                                                                                           {item.reorderQty > 0
                                                                                                  ? `Need ${item.reorderQty}`
                                                                                                  : "Sufficient"}
                                                                                    </span>
                                                                             </td>
                                                                      </tr>
                                                               ))
                                                        ) : (
                                                               <tr>
                                                                      <td colSpan={9} className="p-6 text-center text-gray-500">
                                                                             No forecast data found
                                                                      </td>
                                                               </tr>
                                                        )}
                                                 </tbody>
                                          </table>
                                   </div>
                            )}
                     </div>
              </div>
       );
};

export default Forecast;