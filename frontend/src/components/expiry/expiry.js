import React, { useEffect, useState } from "react";
import { AlertTriangle, Clock, Eye, Trash2, XCircle } from "lucide-react";
import ProductVeiw from "../prooduct/productVeiw";


const API_URL =
       process.env.REACT_APP_API_URL ||
       "https://medialert-backend-tz4c.onrender.com";


const Expiry = () => {
       const [products, setProducts] = useState([]);
       const [loading, setLoading] = useState(true);
       const [search, setSearch] = useState("");
       const [dayFilter, setDayFilter] = useState("all");
       const [categoryFilter, setCategoryFilter] = useState("all");
       const [statusFilter, setStatusFilter] = useState("all");
       const [selectedProduct, setSelectedProduct] = useState(null);
       const [isView, setIsView] = useState(false);

       const getDaysRemaining = (expiryDate) => {
              if (!expiryDate) return 0;
              const today = new Date();
              const expiry = new Date(expiryDate);
              return Math.ceil(
                     (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
              );
       };

       const getStatus = (item) => {
              const days = getDaysRemaining(item.expiryDate);

              if (item.quantity === 0) return "Out of Stock";
              if (days < 0) return "expired";
              if (days <= 30) return "expiring-soon";
              return "safe";
       };

       const expiredCount = products.filter(
              (p) => getDaysRemaining(p.expiryDate) < 0
       ).length;

       const expiring30Days = products.filter((p) => {
              const d = getDaysRemaining(p.expiryDate);
              return d >= 0 && d <= 30;
       }).length;

       const expiring100Days = products.filter((p) => {
              const d = getDaysRemaining(p.expiryDate);
              return d > 30 && d <= 100;
       }).length;

       const matchesStatus = (item) => {
              const status = getStatus(item);

              if (statusFilter === "all") return true;
              if (statusFilter === "in") return status === "safe";
              if (statusFilter === "expired") return status === "expired";
              if (statusFilter === "expiring") return status === "expiring-soon";
              if (statusFilter === "out") return status === "Out of Stock";

              return true;
       };

       const filteredProducts = products.filter((item) => {
              const matchesSearch =
                     item.name?.toLowerCase().includes(search.toLowerCase()) ||
                     item.supplierName?.toLowerCase().includes(search.toLowerCase());

              const matchesCategory =
                     categoryFilter === "all" || item.category === categoryFilter;

              const statusMatch = matchesStatus(item);

              let matchesDays = true;
              if (dayFilter !== "all") {
                     const days = Number(dayFilter);
                     const diffDays = getDaysRemaining(item.expiryDate);
                     matchesDays = diffDays <= days && diffDays >= 0;
              }

              return matchesSearch && matchesCategory && statusMatch && matchesDays;
       });

       const handleDelete = async (id) => {
              const confirmDelete = window.confirm("Are you sure you want to delete?");
              if (!confirmDelete) return;

              try {
                     const user = JSON.parse(sessionStorage.getItem("user"));
                     const userId = user?._id; // FIXED
                     const storeId = user?.storeId;

                     const res = await fetch(`http://localhost:5000/api/inventory/${id}`, {
                            method: "DELETE",
                            headers: {
                                   "user-id": userId,
                                   "store-id": storeId,
                            },
                     });

                     const data = await res.json();

                     if (!res.ok) {
                            alert(data.message || "Delete failed");
                            return;
                     }

                     // ✅ remove from UI instantly (no reload)
                     setProducts((prev) => prev.filter((item) => item._id !== id));

                     alert("Deleted successfully");

              } catch (err) {
                     console.error("Delete error:", err);
                     alert("Server error");
              }
       };

       useEffect(() => {
              const fetchProducts = async () => {
                     const user = JSON.parse(sessionStorage.getItem("user"));
                     const userId = user?.token;
                     const storeId = user?.storeId;
                     try {
                            const res = await fetch(`${API_URL}/api/inventory`, {
                                   headers: {
                                          "user-id": userId,
                                          "store-id": storeId,
                                   },
                            });

                            const data = await res.json();

                            setProducts(Array.isArray(data) ? data : data.data || []);
                     } catch (err) {
                            console.error("Failed to fetch products", err);
                     } finally {
                            setLoading(false);
                     }
              };

              fetchProducts();
       }, []);

       if (loading) {
              return <div className="p-6 text-lg">Loading expiry products...</div>;
       }

       return (
              <div className="flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray-50 min-h-screen">
                     {/* HEADER */}
                     <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                   <h1 className="text-4xl font-bold">Expiry Alerts</h1>
                                   <p className="text-sm text-gray-600">
                                          Monitor and manage medicines nearing or past expiration
                                   </p>
                            </div>
                     </div>

                     {/* CARDS */}
                     <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-5">
                            <div className="flex justify-between items-center p-4 rounded-xl bg-white shadow hover:shadow-lg">
                                   <div className="flex flex-col text-xl">
                                          <span className="text-gray-600 text-lg">Expiring in 30 Days</span>
                                          <span className="font-bold">{expiring30Days}</span>
                                          <span className="text-sm">medicine</span>
                                   </div>
                                   <Clock size={40} className="p-1 bg-blue-50 text-blue-700 rounded-lg" />
                            </div>

                            <div className="flex justify-between items-center p-4 rounded-xl bg-white shadow hover:shadow-lg">
                                   <div className="flex flex-col text-xl">
                                          <span className="text-gray-600">Expiring in 31–100 Days</span>
                                          <span className="font-bold">{expiring100Days}</span>
                                          <span className="text-sm">medicine</span>
                                   </div>
                                   <AlertTriangle size={40} className="p-1 bg-yellow-100 text-yellow-700 rounded-lg" />
                            </div>

                            <div className="flex justify-between items-center p-4 rounded-xl bg-white shadow hover:shadow-lg">
                                   <div className="flex flex-col text-xl">
                                          <span className="text-gray-600">Already Expired</span>
                                          <span className="font-bold">{expiredCount}</span>
                                          <span className="text-sm">medicine</span>
                                   </div>
                                   <XCircle size={40} className="p-1 bg-red-50 text-red-500 rounded-lg" />
                            </div>
                     </div>

                     {isView && (
                            <ProductVeiw
                                   product={selectedProduct}
                                   onClose={() => setIsView(false)}
                            />
                     )}
                     {/* TABLE */}
                     <div className="w-full h-full bg-white shadow-md rounded-xl overflow-x-auto">
                            <div className="px-4 py-3 flex gap-4 items-center border-b max-sm:flex-wrap">
                                   <input
                                          type="search"
                                          placeholder="Search products, suppliers..."
                                          value={search}
                                          onChange={(e) => setSearch(e.target.value)}
                                          className="bg-gray-50 border px-3 rounded-lg w-full sm:w-1/3 h-10"
                                   />

                                   <select
                                          value={dayFilter}
                                          onChange={(e) => setDayFilter(e.target.value)}
                                          className="h-10 px-3 border rounded-xl"
                                   >
                                          <option value="all">All Days</option>
                                          <option value="7">7 Days</option>
                                          <option value="14">14 Days</option>
                                          <option value="30">30 Days</option>
                                   </select>

                                   <select
                                          value={categoryFilter}
                                          onChange={(e) => setCategoryFilter(e.target.value)}
                                          className="h-10 px-3 border rounded-xl"
                                   >
                                          <option value="all">All Categories</option>
                                          <option value="Pain Relief">Pain Relief</option>
                                          <option value="Antibiotics">Antibiotics</option>
                                          <option value="Vitamins">Vitamins</option>
                                   </select>

                                   <select
                                          value={statusFilter}
                                          onChange={(e) => setStatusFilter(e.target.value)}
                                          className="h-10 px-3 border rounded-xl"
                                   >
                                          <option value="all">All Status</option>
                                          <option value="in">In Stock</option>
                                          <option value="out">Out of Stock</option>
                                          <option value="expiring">Expiring</option>
                                          <option value="expired">Expired</option>
                                   </select>
                            </div>

                            <table className="w-full border-collapse">
                                   <thead>
                                          <tr className="text-left bg-gray-100">
                                                 <th className="px-4 py-3">Product Name</th>
                                                 <th className="px-4 py-3">Category</th>
                                                 <th className="px-4 py-3">Batch Number</th>
                                                 <th className="px-4 py-3">Expiry Date</th>
                                                 <th className="px-4 py-3">Quantity</th>
                                                 <th className="px-4 py-3">Days Remaining</th>
                                                 <th className="px-4 py-3">Status</th>
                                                 <th className="px-4 py-3 text-right">Actions</th>
                                          </tr>
                                   </thead>

                                   <tbody>
                                          {filteredProducts.length > 0 ? (
                                                 filteredProducts.map((item) => {
                                                        const daysRemaining = getDaysRemaining(item.expiryDate);
                                                        const status = getStatus(item);

                                                        return (
                                                               <tr
                                                                      key={item._id}
                                                                      className={`border-t ${status === "expired"
                                                                             ? "bg-red-50 hover:bg-red-100"
                                                                             : "bg-white hover:bg-gray-50"
                                                                             }`}
                                                               >
                                                                      <td className="px-4 py-3">{item.name}</td>
                                                                      <td className="px-4 py-3">{item.category}</td>
                                                                      <td className="px-4 py-3">{item.batchNumber}</td>
                                                                      <td className="px-4 py-3">
                                                                             {item.expiryDate
                                                                                    ? new Date(item.expiryDate).toLocaleDateString("en-CA")
                                                                                    : "N/A"}
                                                                      </td>
                                                                      <td className="px-4 py-3">{item.quantity}</td>

                                                                      <td
                                                                             className={`px-4 py-3 font-medium ${status === "expired"
                                                                                    ? "text-red-600"
                                                                                    : status === "expiring-soon"
                                                                                           ? "text-yellow-600"
                                                                                           : "text-green-600"
                                                                                    }`}
                                                                      >
                                                                             {status === "expired"
                                                                                    ? `${Math.abs(daysRemaining)} days ago`
                                                                                    : `${daysRemaining} days left`}
                                                                      </td>

                                                                      <td className="px-4 py-3">
                                                                             <span
                                                                                    className={`px-2 py-1 text-sm rounded-lg font-medium ${status === "expired"
                                                                                           ? "text-red-600 bg-red-100"
                                                                                           : status === "expiring-soon"
                                                                                                  ? "text-amber-600 bg-amber-100"
                                                                                                  : status === "Out of Stock"
                                                                                                         ? "text-red-600 bg-red-100"
                                                                                                         : "text-green-600 bg-green-100"
                                                                                           }`}
                                                                             >
                                                                                    {status}
                                                                             </span>
                                                                      </td>

                                                                      <td className="px-4 py-3 text-right">
                                                                             <div className="flex justify-end gap-4">
                                                                                    <button onClick={() => {
                                                                                           setSelectedProduct(item);
                                                                                           setIsView(true);
                                                                                    }} className="text-gray-500 hover:text-blue-600">
                                                                                           <Eye size={20} />
                                                                                    </button>
                                                                                    <button
                                                                                           onClick={() => handleDelete(item._id)}
                                                                                           className="text-red-500"
                                                                                    >
                                                                                           <Trash2 size={18} />
                                                                                    </button>
                                                                             </div>
                                                                      </td>
                                                               </tr>
                                                        );
                                                 })
                                          ) : (
                                                 <tr>
                                                        <td colSpan="8" className="text-center py-6 text-gray-500">
                                                               No products found
                                                        </td>
                                                 </tr>
                                          )}
                                   </tbody>
                            </table>
                     </div>
              </div>
       );
};

export default Expiry;