import React, { useEffect, useMemo, useState } from "react";
import {
       BadgeIndianRupee,
       IndianRupee,
       ShoppingCart,
       Trash2,
       Plus,
       Minus,
} from "lucide-react";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://medialert-backend-tz4c.onrender.com";

const CreateBill = () => {
       const [search, setSearch] = useState("");
       const [results, setResults] = useState([]);
       const [cart, setCart] = useState([]);
       const [qtyMap, setQtyMap] = useState({});
       const [loading, setLoading] = useState(false);
       // const [activeTab, setActiveTab] = useState("billing");

       const [showCustomer, setShowCustomer] = useState(false);
       const [customer, setCustomer] = useState({
              name: "",
              phone: "",
              email: "",
       });

       const saveBill = async () => {
              if (cart.length === 0) {
                     alert("Cart is empty");
                     return;
              }
              const user = JSON.parse(sessionStorage.getItem("user"));
              const userId = user?.token;
              const storeId = user?.storeId;

              if (!userId) {
                     alert("User ID missing. Please login again.");
                     return;
              }

              if (!storeId) {
                     alert("Store ID missing. Please login again.");
                     return;
              }

              const payload = {
                     userId,
                     customer: showCustomer ? customer : null,
                     totalAmount: Math.round(grandTotal),
                     items: cart.map((item) => ({
                            productId: item._id,
                            name: item.name,
                            quantity: item.qty,
                            price: item.sellingPrice,
                     })),
              };

              try {
                     const res = await fetch(`${API_URL}/api/billing`, {
                            method: "POST",
                            headers: {
                                   "Content-Type": "application/json",
                                   "user-id": userId,
                                   "store-id": storeId,
                            },
                            body: JSON.stringify(payload),
                     });

                     const data = await res.json();

                     if (!res.ok) {
                            alert(data.message || "Billing failed");
                            return;
                     }

                     alert("Bill saved successfully");
                     setCart([]);
                     setCustomer({ name: "", phone: "", email: "" });
                     setShowCustomer(false);
              } catch (err) {
                     console.error(err);
                     alert("Server error");
              }
       };


       useEffect(() => {
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

                            // setRevenueData(data.monthlyRevenue);
                     } catch (err) {
                            console.error(err);
                            alert("Server error");
                     }
              };
              fetchMonthlyRevenue();
       }, [])

       useEffect(() => {
              if (!search.trim()) {
                     setResults([]);
                     return;
              }

              const fetchSearch = async () => {
                     const user = JSON.parse(sessionStorage.getItem("user"));
                     const userId = user?.token;
                     const storeId = user?.storeId;
                     try {
                            setLoading(true);

                            const res = await fetch(`${API_URL}/api/inventory/search?q=${search}`,
                                   {
                                          headers: {
                                                 "Content-Type": "application/json",
                                                 "store-id": storeId,
                                                 "user-id": userId
                                          },
                                   }
                            );

                            const data = await res.json();

                            setResults(Array.isArray(data) ? data : data.data || []);
                     } catch (err) {
                            console.error("Search failed", err);
                     } finally {
                            setLoading(false);
                     }
              };

              const delay = setTimeout(fetchSearch, 400);
              return () => clearTimeout(delay);
       }, [search]);

       const addToCart = (item, qty) => {
              if (qty < 1) return;

              if (qty > item.quantity) {
                     alert("Not enough stock");
                     return;
              }

              const existing = cart.find((c) => c._id === item._id);

              if (existing) {
                     const newQty = existing.qty + qty;

                     if (newQty > item.quantity) {
                            alert("Cannot add more than available stock");
                            return;
                     }

                     setCart((prev) =>
                            prev.map((c) => (c._id === item._id ? { ...c, qty: newQty } : c))
                     );
              } else {
                     setCart((prev) => [...prev, { ...item, qty }]);
              }

              setSearch("");
              setResults([]);
              setQtyMap((prev) => {
                     const copy = { ...prev };
                     delete copy[item._id];
                     return copy;
              });
       };

       const updateQty = (id, qty) => {
              const item = cart.find((c) => c._id === id);
              if (!item) return;

              if (qty < 1) return;

              if (qty > item.quantity) {
                     alert("Cannot exceed stock quantity");
                     return;
              }

              setCart((prev) =>
                     prev.map((i) => (i._id === id ? { ...i, qty } : i))
              );
       };

       const removeFromCart = (id) => {
              setCart((prev) => prev.filter((i) => i._id !== id));
       };

       const subTotal = useMemo(
              () => cart.reduce((t, i) => t + i.qty * i.sellingPrice, 0),
              [cart]
       );

       const tax = subTotal * 0.05;
       const grandTotal = subTotal + tax;

       return (
              <div >

                     <div className="flex gap-4 max-lg:flex-col">
                            {/* LEFT SIDE */}
                            <div className="w-2/3 max-lg:w-full flex flex-col gap-4">
                                   {/* SEARCH */}
                                   <div className="bg-white p-4 rounded-xl shadow">
                                          <input
                                                 value={search}
                                                 onChange={(e) => setSearch(e.target.value)}
                                                 placeholder="Search by Batch No or Medicine Name"
                                                 className="w-full h-10 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                          />

                                          {loading && (
                                                 <p className="mt-2 text-sm text-gray-500">Searching...</p>
                                          )}

                                          {/* SEARCH RESULTS */}
                                          {search && results.length > 0 && (
                                                 <div className="mt-3 border rounded-lg bg-white">
                                                        {results.map((item) => {
                                                               const qty = qtyMap[item._id] || 1;

                                                               return (
                                                                      <div
                                                                             key={item._id}
                                                                             className="flex justify-between items-center p-3 border-b"
                                                                      >
                                                                             <div>
                                                                                    <p className="font-semibold">{item.name}</p>
                                                                                    <p className="text-sm text-gray-600">
                                                                                           Batch: {item.batchNumber} | Stock: {item.quantity}
                                                                                    </p>
                                                                             </div>

                                                                             <div className="flex items-center gap-2">
                                                                                    <input
                                                                                           type="number"
                                                                                           min={1}
                                                                                           max={item.quantity}
                                                                                           value={qty}
                                                                                           onChange={(e) =>
                                                                                                  setQtyMap({
                                                                                                         ...qtyMap,
                                                                                                         [item._id]: Number(e.target.value),
                                                                                                  })
                                                                                           }
                                                                                           className="w-16 text-center border rounded outline-none"
                                                                                    />

                                                                                    <button
                                                                                           onClick={() => addToCart(item, qty)}
                                                                                           className="px-3 py-1 bg-blue-600 text-white rounded"
                                                                                    >
                                                                                           Add
                                                                                    </button>
                                                                             </div>
                                                                      </div>
                                                               );
                                                        })}
                                                 </div>
                                          )}
                                   </div>

                                   {/* CART */}
                                   <div className="bg-white rounded-xl shadow overflow-x-auto">
                                          <h2 className="px-4 py-3 font-semibold">
                                                 Billing Cart ({cart.length})
                                          </h2>

                                          {cart.length === 0 ? (
                                                 <div className="py-16 text-center text-gray-500">
                                                        <ShoppingCart className="mx-auto mb-2" />
                                                        Cart is empty
                                                 </div>
                                          ) : (
                                                 <table className="w-full min-w-[700px]">
                                                        <thead className="bg-gray-100">
                                                               <tr>
                                                                      <th className="px-4 py-2 text-left">Name</th>
                                                                      <th>Batch</th>
                                                                      <th>Qty</th>
                                                                      <th>Price</th>
                                                                      <th>Total</th>
                                                                      <th></th>
                                                               </tr>
                                                        </thead>

                                                        <tbody>
                                                               {cart.map((item) => (
                                                                      <tr key={item._id} className="border-t">
                                                                             <td className="px-4 py-2">{item.name}</td>
                                                                             <td>{item.batchNumber}</td>

                                                                             <td>
                                                                                    <div className="flex items-center gap-1 justify-center">
                                                                                           <button
                                                                                                  onClick={() => updateQty(item._id, item.qty - 1)}
                                                                                                  className="p-1 border rounded"
                                                                                           >
                                                                                                  <Minus size={14} />
                                                                                           </button>

                                                                                           <input
                                                                                                  type="number"
                                                                                                  min={1}
                                                                                                  value={item.qty}
                                                                                                  onChange={(e) =>
                                                                                                         updateQty(item._id, Number(e.target.value))
                                                                                                  }
                                                                                                  className="w-14 text-center border rounded outline-none"
                                                                                           />

                                                                                           <button
                                                                                                  onClick={() => updateQty(item._id, item.qty + 1)}
                                                                                                  className="p-1 border rounded"
                                                                                           >
                                                                                                  <Plus size={14} />
                                                                                           </button>
                                                                                    </div>
                                                                             </td>

                                                                             <td className="text-center">₹ {item.sellingPrice}</td>
                                                                             <td className="text-center">
                                                                                    ₹ {item.qty * item.sellingPrice}
                                                                             </td>

                                                                             <td className="text-center">
                                                                                    <button
                                                                                           onClick={() => removeFromCart(item._id)}
                                                                                           className="text-red-500"
                                                                                    >
                                                                                           <Trash2 size={18} />
                                                                                    </button>
                                                                             </td>
                                                                      </tr>
                                                               ))}
                                                        </tbody>
                                                 </table>
                                          )}
                                   </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="w-1/3 max-lg:w-full flex flex-col gap-4">
                                   {/* CUSTOMER */}
                                   <div className="bg-white rounded-xl p-4 shadow">
                                          <div className="flex justify-between items-center mb-3">
                                                 <h2 className="font-semibold text-lg">Customer Details</h2>

                                                 <button
                                                        onClick={() => setShowCustomer(!showCustomer)}
                                                        className="text-blue-600 text-sm font-medium"
                                                 >
                                                        {showCustomer ? "Hide" : "Add"}
                                                 </button>
                                          </div>

                                          {showCustomer ? (
                                                 <div className="flex flex-col gap-3">
                                                        <input
                                                               type="text"
                                                               placeholder="Customer Name"
                                                               value={customer.name}
                                                               onChange={(e) =>
                                                                      setCustomer({ ...customer, name: e.target.value })
                                                               }
                                                               className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                                        />

                                                        <input
                                                               type="tel"
                                                               placeholder="Phone Number"
                                                               value={customer.phone}
                                                               onChange={(e) =>
                                                                      setCustomer({ ...customer, phone: e.target.value })
                                                               }
                                                               className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                                        />

                                                        <input
                                                               type="email"
                                                               placeholder="Email (optional)"
                                                               value={customer.email}
                                                               onChange={(e) =>
                                                                      setCustomer({ ...customer, email: e.target.value })
                                                               }
                                                               className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                 </div>
                                          ) : (
                                                 <p className="text-sm text-gray-500">
                                                        No customer selected (walk-in customer)
                                                 </p>
                                          )}
                                   </div>

                                   {/* BILL SUMMARY */}
                                   <div className="bg-white rounded-xl p-4 shadow">
                                          <h2 className="font-semibold flex items-center gap-2">
                                                 <IndianRupee /> Billing Summary
                                          </h2>

                                          <div className="flex justify-between py-2 border-b">
                                                 <span>Subtotal</span>
                                                 <span className="flex gap-1">
                                                        <BadgeIndianRupee /> {subTotal.toFixed(2)}
                                                 </span>
                                          </div>

                                          <div className="flex justify-between py-2 border-b">
                                                 <span>Tax (5%)</span>
                                                 <span className="flex gap-1">
                                                        <BadgeIndianRupee /> {tax.toFixed(2)}
                                                 </span>
                                          </div>

                                          <div className="flex justify-between py-3 text-lg font-bold">
                                                 <span>Total</span>
                                                 <span className="flex gap-1 text-blue-600">
                                                        <BadgeIndianRupee /> {grandTotal.toFixed(2)}
                                                 </span>
                                          </div>
                                   </div>

                                   {/* ACTIONS */}
                                   <div className="bg-white rounded-xl p-4 shadow flex flex-col gap-2">
                                          <button
                                                 onClick={saveBill}
                                                 disabled={cart.length === 0}
                                                 className="bg-blue-700 text-white rounded-xl p-2 disabled:opacity-50"
                                          >
                                                 Save Bill
                                          </button>

                                          <button
                                                 onClick={saveBill}
                                                 disabled={cart.length === 0}
                                                 className="bg-green-700 text-white rounded-xl p-2 disabled:opacity-50"
                                          >
                                                 Save & Print
                                          </button>
                                   </div>
                            </div>
                     </div>
              </div>
       );
};

export default CreateBill
