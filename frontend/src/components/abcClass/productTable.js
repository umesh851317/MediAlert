import React from "react";

const ProductTable = ({
  products,
  abcFilter,
  xyzFilter,
  classFilter,
  searchQuery,
  loading,
}) => {
  const filteredProducts = products.filter((product) => {
    const matchesABC = abcFilter === "all" || product.abcClass === abcFilter;
    const matchesXYZ = xyzFilter === "all" || product.xyzClass === xyzFilter;
    const matchesClass = classFilter === "all" || product.finalClass === classFilter;
    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesABC && matchesXYZ && matchesClass && matchesSearch;
  });

  const getBadgeColor = (value) => {
    switch (value) {
      case "A":
      case "AX":
      case "AY":
      case "AZ":
        return "bg-blue-100 text-blue-700";
      case "B":
      case "BX":
      case "BY":
      case "BZ":
        return "bg-purple-100 text-purple-700";
      case "C":
      case "CX":
      case "CY":
      case "CZ":
        return "bg-gray-100 text-gray-700";
      case "X":
        return "bg-green-100 text-green-700";
      case "Y":
        return "bg-orange-100 text-orange-700";
      case "Z":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Classified Products</h2>

      <table className="w-full min-w-[1000px] text-sm">
        <thead>
          <tr className="border-b text-left text-gray-600">
            <th className="py-3 px-3">Product</th>
            <th className="py-3 px-3">Category</th>
            <th className="py-3 px-3">Annual Qty</th>
            <th className="py-3 px-3">Annual Value</th>
            <th className="py-3 px-3">CV %</th>
            <th className="py-3 px-3">ABC</th>
            <th className="py-3 px-3">XYZ</th>
            <th className="py-3 px-3">Final Class</th>
            <th className="py-3 px-3">Stock</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.productId} className="border-b hover:bg-gray-50">
                <td className="py-3 px-3 font-medium text-gray-900">{product.name}</td>
                <td className="py-3 px-3 text-gray-600">{product.category}</td>
                <td className="py-3 px-3">{product.totalQuantity}</td>
                <td className="py-3 px-3">₹{product.totalValue}</td>
                <td className="py-3 px-3">{product.cv}</td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.abcClass)}`}>
                    {product.abcClass}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.xyzClass)}`}>
                    {product.xyzClass}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(product.finalClass)}`}>
                    {product.finalClass}
                  </span>
                </td>
                <td className="py-3 px-3">{product.currentStock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-6 text-center text-gray-500">
                No products found for selected filters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;