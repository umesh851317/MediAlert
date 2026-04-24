import {
  AlertCircle,
  Edit,
  Eye,
  Package,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import AddCompo from "./addCompo";
import ProductVeiw from "./productVeiw";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://medialert-backend-tz4c.onrender.com";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const getStatus = (item) => {
    if (item.quantity === 0) return "Out of Stock";
    if (item.quantity <= item.reorderLevel) return "Low Stock";
    return "OK";
  };

  const matchesStatus = (item) => {
    const status = getStatus(item);

    if (statusFilter === "all") return true;
    if (statusFilter === "in") return status === "OK";
    if (statusFilter === "out") return status === "Out of Stock";

    return true;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Expired":
      case "Out of Stock":
        return "bg-red-100 text-red-700";

      case "Expiring Soon":
        return "bg-yellow-100 text-yellow-700";

      case "Low Stock":
        return "bg-amber-100 text-amber-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.supplierName?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const statusMatch = matchesStatus(item);

    let matchesDays = true;
    if (dayFilter !== "all") {
      const days = Number(dayFilter);
      const expiry = new Date(item.expiryDate);
      const today = new Date();

      const diffDays =
        (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

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

  // FETCH DATA
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const userId = user?.token;
        const storeId = user?.storeId;

        const res = await fetch(`${API_URL}/api/inventory`, {
          headers: {
            "user-id": userId,
            "store-id": storeId,
          },
        });

        const data = await res.json();
        setProducts(data);

      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false)
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col p-6 gap-4 w-full bg-gray-50">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Products</h1>
          <p className="text-sm text-gray-600">
            Manage your pharmacy inventory
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white"
        >
          + Add Product
        </button>
      </div>

      {/* ADD PRODUCT MODAL */}
      {open && (
        <AddCompo
          onClose={() => {
            setOpen(false);
            setSelectedProduct(null);
            setIsEdit(false);
          }}
          product={selectedProduct}
          isEdit={isEdit}
        />
      )}

      {isView && (
        <ProductVeiw
          product={selectedProduct}
          onClose={() => {
            setIsView(false);
            setSelectedProduct(null);
          }}
        />
      )}

      <div className="grid grid-cols-3 gap-5">
        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow">
          <div>
            <p className="text-gray-600">Total Items</p>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>
          <Package className="bg-blue-50 text-blue-700 p-2 rounded-lg" size={40} />
        </div>

        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow">
          <div>
            <p className="text-gray-600">Low Stock</p>
            <p className="text-2xl font-bold">
              {products.filter(
                p => p.quantity <= p.reorderLevel && p.quantity > 0
              ).length}
            </p>
          </div>
          <AlertCircle className="bg-yellow-100 text-yellow-700 p-2 rounded-lg" size={40} />
        </div>

        <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow">
          <div>
            <p className="text-gray-600">Expired</p>
            <p className="text-2xl font-bold">
              {/* {products.filter(p => new Date(p.expiryDate) < new Date()).length} */}
            </p>
          </div>
          <AlertCircle className="bg-red-100 text-red-600 p-2 rounded-lg" size={40} />
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="w-full h-15 px-4 flex gap-4 items-center border-b flex-wrap py-2">
        <input
          type="search"
          placeholder="Search products, suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-50 border px-2 rounded-lg w-full sm:w-1/3 h-8"
        />

        <select
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          className="h-9 px-3 border rounded-xl"
        >
          <option value="all">All Days</option>
          <option value="7">7 Days</option>
          <option value="14">14 Days</option>
          <option value="30">30 Days</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-9 px-3 border rounded-xl"
        >
          <option value="all">All Categories</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Antibiotics">Antibiotics</option>
          <option value="Vitamins">Vitamins</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 border rounded-xl"
        >
          <option value="all">All Status</option>
          <option value="in">In stock</option>
          <option value="out">Out of stock</option>
          <option value="expiring">Expiring</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2 w-30">Min Qty</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Expiry</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            )}

            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {!loading &&
              filteredProducts.map((item) => {
                const status = getStatus(item)

                return (
                  <tr key={item._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.category}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.reorderLevel}</td>
                    <td className="px-4 py-2">{item.sellingPrice}</td>
                    <td className="px-4 py-2">
                      {item.expiryDate.split("T")[0]}
                    </td>

                    <td className="text-center">
                      <span className={`px-2 py-1 rounded-lg text-sm font-medium ${getStatusStyle(status)}`} >
                        {status}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-center flex justify-end gap-4">
                      <button onClick={() => {
                        setSelectedProduct(item);
                        setIsView(true);
                      }} className="text-gray-500 hover:text-blue-600">
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setIsEdit(true);
                          setOpen(true);
                        }}
                        className="text-gray-600"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                )
              })}


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;