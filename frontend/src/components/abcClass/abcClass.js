import React, { useEffect, useState } from "react";
import ABCXYZMatrix from "./ABCXYZMatrix";
import ProductTable from "./productTable";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://medialert-backend-tz4c.onrender.com";

const AbcClass = () => {
       const [abcFilter, setAbcFilter] = useState("all");
       const [xyzFilter, setXyzFilter] = useState("all");
       const [classFilter, setClassFilter] = useState("all");
       const [searchQuery, setSearchQuery] = useState("");

       const [loading, setLoading] = useState(true);
       const [summary, setSummary] = useState({
              totalProducts: 0,
              highValueItems: 0,
              stableDemandItems: 0,
              highRiskItems: 0,
       });
       const [matrix, setMatrix] = useState({
              AX: 0, AY: 0, AZ: 0,
              BX: 0, BY: 0, BZ: 0,
              CX: 0, CY: 0, CZ: 0,
       });
       const [products, setProducts] = useState([]);

       const fetchAnalysis = async () => {
              const user = JSON.parse(sessionStorage.getItem("user"));
              const userId = user?.token;
              const storeId = user?.storeId;
              try {
                     setLoading(true);

                     const res = await fetch(`${API_URL}/api/analysis/abc-xyz`, {
                            method: "GET",
                            headers: {
                                   "Content-Type": "application/json",
                                   "user-id": userId,
                                   "store-id": storeId,
                            },
                     });

                     const data = await res.json();
                     
                     if (data.success) {
                            setSummary(data.summary);
                            setMatrix(data.matrix);
                            setProducts(data.products);
                     } else {
                            console.error("Failed to fetch ABC-XYZ analysis");
                     }
              } catch (error) {
                     console.error("Error fetching ABC-XYZ analysis:", error);
              } finally {
                     setLoading(false);
              }
       };

       useEffect(() => {
              fetchAnalysis();
       }, []);

       return (
              <div className="flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray-50 min-h-screen">
                     {/* HEADER */}
                     <div className="flex flex-col">
                            <h1 className="text-4xl font-bold">ABC-XYZ Classification</h1>
                            <p className="text-sm text-gray-600">
                                   Optimize inventory management with value and demand-based classification
                            </p>
                     </div>

                     {/* SUMMARY CARDS */}
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="rounded-2xl border-[0.5px] border-gray-300 bg-white shadow-sm p-4">
                                   <h2 className="pb-1 text-sm text-gray-600">Total Products Classified</h2>
                                   <p className="text-3xl font-semibold mb-1">
                                          {loading ? "..." : summary.totalProducts}
                                   </p>
                                   <p className="text-xs text-gray-500">Across all categories</p>
                            </div>

                            <div className="rounded-2xl border-[0.5px] border-gray-300 bg-white shadow-sm p-4">
                                   <h2 className="pb-1 text-sm text-gray-600">High Value Items (A)</h2>
                                   <p className="text-3xl font-semibold mb-1">
                                          {loading ? "..." : summary.highValueItems}
                                   </p>
                                   <p className="text-xs text-gray-500">Based on annual sales value</p>
                            </div>

                            <div className="rounded-2xl border-[0.5px] border-gray-300 bg-white shadow-sm p-4">
                                   <h2 className="pb-1 text-sm text-gray-600">Stable Demand Items (X)</h2>
                                   <p className="text-3xl font-semibold mb-1">
                                          {loading ? "..." : summary.stableDemandItems}
                                   </p>
                                   <p className="text-xs text-gray-500">Low demand variability</p>
                            </div>

                            <div className="rounded-2xl border-[0.5px] border-gray-300 bg-white shadow-sm p-4">
                                   <h2 className="pb-1 text-sm text-gray-600">High Risk Items (CZ)</h2>
                                   <p className="text-3xl font-semibold mb-1">
                                          {loading ? "..." : summary.highRiskItems}
                                   </p>
                                   <p className="text-xs text-gray-500">Low value, highly variable demand</p>
                            </div>
                     </div>

                     {/* MATRIX */}
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                   <div>
                                          <h2 className="text-lg font-semibold text-gray-900">ABC-XYZ Matrix</h2>
                                          <p className="text-sm text-gray-500 mt-1">
                                                 Product distribution by value and demand variability
                                          </p>
                                   </div>
                            </div>
                            <ABCXYZMatrix matrix={matrix} />
                     </div>

                     {/* FILTERS */}
                     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-4 flex-wrap">
                                   <div className="flex items-center gap-2">
                                          <span className="text-lg">⚙️</span>
                                          <span className="text-sm font-medium text-gray-700">Filters:</span>
                                   </div>

                                   <select
                                          value={abcFilter}
                                          onChange={(e) => setAbcFilter(e.target.value)}
                                          className="w-[140px] px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   >
                                          <option value="all">All ABC</option>
                                          <option value="A">A - High Value</option>
                                          <option value="B">B - Medium Value</option>
                                          <option value="C">C - Low Value</option>
                                   </select>

                                   <select
                                          value={xyzFilter}
                                          onChange={(e) => setXyzFilter(e.target.value)}
                                          className="w-[140px] px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   >
                                          <option value="all">All XYZ</option>
                                          <option value="X">X - Stable</option>
                                          <option value="Y">Y - Moderate</option>
                                          <option value="Z">Z - Variable</option>
                                   </select>

                                   <select
                                          value={classFilter}
                                          onChange={(e) => setClassFilter(e.target.value)}
                                          className="w-[140px] px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   >
                                          <option value="all">All Classes</option>
                                          <option value="AX">AX</option>
                                          <option value="AY">AY</option>
                                          <option value="AZ">AZ</option>
                                          <option value="BX">BX</option>
                                          <option value="BY">BY</option>
                                          <option value="BZ">BZ</option>
                                          <option value="CX">CX</option>
                                          <option value="CY">CY</option>
                                          <option value="CZ">CZ</option>
                                   </select>

                                   <div className="flex-1 min-w-[200px]">
                                          <div className="relative">
                                                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                                                 <input
                                                        type="text"
                                                        placeholder="Search by product name..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                                                 />
                                          </div>
                                   </div>
                            </div>
                     </div>

                     {/* PRODUCT TABLE */}
                     <ProductTable
                            products={products}
                            abcFilter={abcFilter}
                            xyzFilter={xyzFilter}
                            classFilter={classFilter}
                            searchQuery={searchQuery}
                            loading={loading}
                     />
              </div>
       );
};

export default AbcClass;