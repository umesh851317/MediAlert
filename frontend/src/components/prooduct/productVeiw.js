import { useEffect, useState } from "react";
import {
  Package,
  Calendar,
  AlertCircle,
  Building2,
  Hash,
  Layers,
  FileText,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ProductVeiw = ({ product, onClose }) => {
  const [sales, setSales] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const userId = user?.token || user?._id || user?.id;
        const storeId = user?.storeId;

        const res = await fetch(
          `http://localhost:5000/api/sales/product/${product._id}`,
          {
            headers: {
              "user-id": userId,
              "store-id": storeId,
            },
          }
        );

        const data = await res.json();
        setSales(data);

        const bill = await fetch(
          `http://localhost:5000/api/billing/billHistory/${product._id}`,
          {
            headers: {
              "user-id": userId,
              "store-id": storeId,
            },
          }
        );

        const billdata = await bill.json();
        setBills(Array.isArray(billdata) ? billdata : billdata.bills || []);

      } catch (err) {
        console.error(err);
      }
    };

    if (product?._id) fetchData();
  }, [product]);

  if (!product) return null;

  // ✅ STATUS
  const getStatus = () => {
    if (product.quantity === 0) return "expired";
    if (product.quantity <= product.reorderLevel) return "low-stock";
    return "in-stock";
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "in-stock":
        return { label: "In Stock", className: "bg-green-100 text-green-700" };
      case "low-stock":
        return { label: "Low Stock", className: "bg-yellow-100 text-yellow-700" };
      case "expired":
        return { label: "Out of Stock", className: "bg-red-100 text-red-700" };
      default:
        return { label: "Unknown", className: "bg-gray-100 text-gray-700" };
    }
  };

  const statusConfig = getStatusConfig(getStatus());

  // ✅ DETAILS
  const details = [
    { icon: Layers, label: "Category", value: product.category },
    { icon: Hash, label: "Batch", value: product.batchNumber },
    { icon: Package, label: "Stock", value: `${product.quantity} ${product.unit}` },
    { icon: AlertCircle, label: "Min Stock", value: product.reorderLevel },
    {
      icon: Calendar,
      label: "Expiry",
      value: product.expiryDate
        ? new Date(product.expiryDate).toLocaleDateString()
        : "N/A",
    },
    { icon: Building2, label: "Supplier", value: product.supplierName || "N/A" },
    { icon: FileText, label: "Brand", value: product.brand },
    { icon: Layers, label: "Pack Size", value: product.packSize },
    { icon: Package, label: "Purchase", value: `₹${product.purchasePrice}` },
    { icon: Package, label: "Selling", value: `₹${product.sellingPrice}` },
  ];

  // ✅ 🔥 12 MONTH GENERATOR
  const generateLast12Months = () => {
    const months = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      months.push({ key, label });
    }

    return months;
  };

  // ✅ 🔥 DYNAMIC CHART DATA
  const months = generateLast12Months();

  const chartData = months.map((m) => {
    const found = sales.find((s) => s.month === m.key);

    const date = new Date(m.key + "-01");

    return {
      month: date.toLocaleString("default", { month: "short" }),
      year: date.getFullYear(),
      sales: found ? found.quantitySold : 0,
    };
  });

  // ✅ SALES HISTORY (dummy)
  const salesHistory = [
    { date: "2026-04-10", quantity: 24, price: 12.5, billId: "INV-8472", total: 300 },
    { date: "2026-04-08", quantity: 18, price: 12.5, billId: "INV-8461", total: 225 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-gray-100 rounded-3xl p-4 flex flex-col gap-4 w-full max-w-6xl max-h-[90vh] overflow-y-auto">

        {/* CLOSE BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-red-500 text-white rounded-lg"
          >
            Close
          </button>
        </div>

        {/* HEADER */}
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-3xl font-semibold mb-2">{product.name}</h2>

          <div className="flex items-center gap-3">
            <span
              className={`px-4 py-1.5 rounded-full text-sm border ${statusConfig.className}`}
            >
              {statusConfig.label}
            </span>

            <span className="px-4 py-1.5 rounded-full text-sm bg-gray-100 border">
              SKU: MED-{product.batchNumber?.slice(-4) || "0000"}
            </span>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="p-6 bg-white rounded-xl shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.map((detail, index) => {
            const Icon = detail.icon;

            return (
              <div
                key={index}
                className="p-5 rounded-2xl bg-gray-50 hover:bg-gray-100 border"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-white shadow ${detail.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">{detail.label}</p>
                    <p className="font-medium">{detail.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CHART */}
        <div className="p-6 bg-white rounded-xl shadow">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* SALES TABLE */}
        <div className="p-6 bg-white rounded-xl shadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">Sales History</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <Download size={16} /> Export
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-500 text-sm">
                <th className="py-2">Date</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total(with tax)</th>
                <th>Bill</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {bills.map((b, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b hover:bg-gray-50"
                >
                  {/* 📅 Date */}
                  <td className="py-2">
                    {new Date(b.billDate).toLocaleDateString()}
                  </td>

                  {/* 📦 Quantity */}
                  <td>{b.soldQty}</td>

                  {/* 💰 Price */}
                  <td>₹{b.price}</td>

                  {/* 💵 Total */}
                  <td className="font-semibold">₹{b.totalPrice}</td>

                  {/* 🧾 Invoice */}
                  <td>{b.invoiceId}</td>

                  {/* 🔗 Action */}
                  <td className="text-right">
                    <ArrowUpRight size={16} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductVeiw;