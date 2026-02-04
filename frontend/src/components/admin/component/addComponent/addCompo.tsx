import { X } from "lucide-react";

function AddCompo({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add New Stock</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form className="grid grid-cols-2 gap-4">

          {/* Product Name */}
          <div>
            <label className="text-sm font-medium">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Paracetamol 500mg"
              className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="mt-1 w-full border rounded-xl px-3 py-2 text-sm">
              <option>Select Category</option>
              <option>Pain Relief</option>
              <option>Antibiotics</option>
              <option>Vitamins</option>
            </select>
          </div>

          {/* Batch Number */}
          <div>
            <label className="text-sm font-medium">
              Batch Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. BATCH-2026-0001"
              className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"
            />
          </div>

          {/* Minimum Stock */}
          <div>
            <label className="text-sm font-medium">
              Minimum Stock Level <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter minimum level"
              className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="text-sm font-medium">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"
            />
          </div>
        </form>

        {/* Note */}
        <p className="text-xs text-gray-500 mt-4">
          Note: All fields marked with <span className="text-red-500">*</span> are
          required. Make sure to enter accurate information for proper stock
          management.
        </p>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-blue-600 text-white text-sm"
          >
            Add Stock
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddCompo
