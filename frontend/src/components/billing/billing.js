import React, { useEffect, useMemo, useState } from "react";
import {
       BadgeIndianRupee,
       IndianRupee,
       ShoppingCart,
       Trash2,
       Plus,
       Minus,
} from "lucide-react";
import CreateBill from "./createBill";
import BillingHistory from "./BillingHistory";

const Billing = () => {
       const [activeTab, setActiveTab] = useState("billing");
       const [currCompo, setCurrCompo] = useState("billing");


       return (
              <div className="flex flex-col p-6 gap-4 w-full bg-gray-50 min-h-screen">
                     <h1 className="text-4xl font-bold">Billing & Orders</h1>

                     <div className="flex gap-1 bg-white border rounded-xl border-gray-200 p-2">

                            <div
                                   onClick={() => setActiveTab("billing")}
                                   className={`cursor-pointer border rounded-2xl px-3 py-1 transition ${activeTab === "billing"
                                          ? "bg-blue-600 text-white"
                                          : "bg-white text-gray-700"}`}
                            >
                                   New Bill
                            </div>

                            <div
                                   onClick={() => setActiveTab("history")}
                                   className={`cursor-pointer border rounded-2xl px-3 py-1 transition ${activeTab === "history"
                                          ? "bg-blue-600 text-white"
                                          : "bg-white text-gray-700"}`}
                            >
                                   Billing History
                            </div>

                     </div>
                     {activeTab === "billing" ? (
                            <div>
                                   {/* Your Billing UI */}
                                   <CreateBill/>
                            </div>
                     ) : (
                            <div>
                                   {/* Your Billing History UI */}
                                   <BillingHistory/>
                            </div>
                     )}

              </div>
       );
};

export default Billing;