import React, { useState } from "react";
import { X } from "lucide-react";

const AddCompo = ({ onClose, onAddSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    batchNumber: "",
    quantity: "",
    minStock: "",
    expiryDate: "",
    purchasePrice: "",
    sellingPrice: "",
    supplierName: "",
    unit: "",
    packSize: "1",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user?.token;   // currently your app stores userId inside token
    const storeId = user?.storeId;

    if (!userId || !storeId) {
      alert("Please login again");
      return;
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      batchNumber: formData.batchNumber,
      expiryDate: formData.expiryDate,
      quantity: Number(formData.quantity),
      reorderLevel: Number(formData.minStock), // minStock → reorderLevel
      purchasePrice: Number(formData.purchasePrice),
      sellingPrice: Number(formData.sellingPrice),
      supplierName: formData.supplierName,
      unit: formData.unit,
      packSize: formData.unit === "tablet" ? Number(formData.packSize) : 1,
    };

    try {
      const res = await fetch("http://localhost:5000/api/inventory", {
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
        alert(data.message || "Failed to add stock");
        return;
      }

      alert("Stock added successfully");

      if (onAddSuccess) {
        onAddSuccess(data);
      }

      onClose();
    } catch (err) {
      console.error("Add Stock Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New Stock</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          >
            <option value="">Select Category</option>
            <option value="Pain Relief">Pain Relief</option>
            <option value="Antibiotics">Antibiotics</option>
            <option value="Vitamins">Vitamins</option>
          </select>

          <input
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <input
            name="batchNumber"
            placeholder="Batch Number"
            value={formData.batchNumber}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <input
            name="quantity"
            type="number"
            min={0}
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <input
            name="minStock"
            type="number"
            min={1}
            placeholder="Minimum Stock (Reorder Level)"
            value={formData.minStock}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          >
            <option value="">Select Unit</option>
            <option value="tablet">Tablet</option>
            <option value="bottle">Bottle</option>
            <option value="vial">Injection</option>
            <option value="tube">Cream</option>
          </select>

          {formData.unit === "tablet" && (
            <input
              name="packSize"
              type="number"
              min={1}
              placeholder="Tablets per strip"
              value={formData.packSize}
              onChange={handleChange}
              required
              className="border rounded-xl px-3 py-2 text-sm"
            />
          )}

          <input
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <input
            name="purchasePrice"
            type="number"
            min={0}
            placeholder="Purchase Price"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <input
            name="sellingPrice"
            type="number"
            min={0}
            placeholder="Selling Price"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
            className="border rounded-xl px-3 py-2 text-sm"
          />

          <input
            name="supplierName"
            placeholder="Supplier Name"
            value={formData.supplierName}
            onChange={handleChange}
            className="border rounded-xl px-3 py-2 text-sm md:col-span-2"
          />

          {/* SUBMIT inside form for Enter key support */}
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white"
          >
            Add Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompo;