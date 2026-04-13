import {
  ChevronUp,
  Cloud,
  Minus,
  Package,
  Snowflake,
  Sun,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://medialert-backend-tz4c.onrender.com";

const Seasonal = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSeasonalData = async () => {
    try {
      setLoading(true);
      setError("");

      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user?.token;
      const storeId = user?.storeId;
      if (!storeId) {
        setError("Store ID missing. Please login again.");
        return;
      }

      const commonHeaders = {
        "Content-Type": "application/json",
        "store-id": storeId,
        "user-id": userId || "",
      };

      const [categoryRes, productRes] = await Promise.all([
        fetch(`${API_URL}/api/seasonal/category`, {
          headers: commonHeaders,
        }),
        fetch(`${API_URL}/api/seasonal/products`, {
          headers: commonHeaders,
        }),
      ]);

      const categoryJson = await categoryRes.json();
      const productJson = await productRes.json();

      if (!categoryRes.ok) {
        throw new Error(categoryJson.message || "Failed to fetch category data");
      }

      if (!productRes.ok) {
        throw new Error(productJson.message || "Failed to fetch product data");
      }

      setCategoryData(Array.isArray(categoryJson) ? categoryJson : []);
      setProductData(Array.isArray(productJson) ? productJson : []);
    } catch (err) {
      console.error("Seasonal fetch error:", err);
      setError(err.message || "Failed to fetch seasonal data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeasonalData();
  }, []);

  const getTrendIcon = (increase) => {
    if (increase > 80)
      return <ChevronUp className="w-4 h-4 text-green-600" />;
    if (increase > 40)
      return <ChevronUp className="w-4 h-4 text-amber-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getSeasonIcon = (season) => {
    if (!season) return null;

    switch (season.toLowerCase()) {
      case "summer":
        return <Sun className="w-4 h-4" />;
      case "monsoon":
        return <Cloud className="w-4 h-4" />;
      case "winter":
        return <Snowflake className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Summary cards data
  const topCategory = categoryData.length
    ? [...categoryData].sort((a, b) => (b.peakSales || 0) - (a.peakSales || 0))[0]
    : null;

  const topSeason = categoryData.length
    ? [...categoryData].sort((a, b) => (b.increase || 0) - (a.increase || 0))[0]
    : null;

  const avgIncrease = categoryData.length
    ? Math.round(
      categoryData.reduce((sum, item) => sum + (item.increase || 0), 0) /
      categoryData.length
    )
    : 0;

  if (loading) {
    return <div className="p-6 text-lg">Loading seasonal data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 font-medium">{error}</div>;
  }

  return (
    <div className="flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Seasonal Demand Analysis</h1>
        <p className="text-sm text-gray-600">
          Analyze medicine demand patterns across different seasons and optimize
          inventory
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* High Demand Season */}
        <div className="rounded-2xl bg-white shadow-sm p-4">
          <h2 className="pb-3 text-sm text-gray-600">High Demand Season</h2>
          <div>
            <div className="flex items-center gap-2">
              {getSeasonIcon(topSeason?.peakSeason || "Monsoon") || (
                <Cloud className="w-5 h-5 text-blue-600" />
              )}
              <p className="text-2xl font-semibold text-gray-900">
                {topSeason?.peakSeason || "Monsoon"}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Based on highest seasonal growth
            </p>
          </div>
        </div>

        {/* Top Category */}
        <div className="rounded-2xl bg-white shadow-sm p-4">
          <h2 className="pb-3 text-sm text-gray-600">Top Demand Category</h2>
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <p className="text-2xl font-semibold text-gray-900">
                {topCategory?.category || "N/A"}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {(topCategory?.peakSales || 0).toLocaleString()} units/month
            </p>
          </div>
        </div>

        {/* Avg Increase */}
        <div className="rounded-2xl bg-white shadow-sm p-4">
          <h2 className="pb-3 text-sm text-gray-600">Seasonal Sales Increase</h2>
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <p className="text-2xl font-semibold text-gray-900">
                +{avgIncrease}%
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs. average sales</p>
          </div>
        </div>
      </div>

      {/* CATEGORY TABLE */}
      <div className="rounded-2xl bg-white shadow-sm p-4 overflow-x-auto">
        <div className="pb-4">
          <h2 className="text-2xl font-semibold">Category-Wise Seasonal Demand</h2>
          <p className="font-normal text-gray-500 text-sm tracking-wide">
            Breakdown of demand patterns by medicine category
          </p>
        </div>

        {categoryData.length === 0 ? (
          <p className="text-gray-500 py-6">No category data found.</p>
        ) : (
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="text-left text-base bg-gray-100">
                <th className="py-3 px-2">Medicine Category</th>
                <th className="py-3 px-2">Peak Season</th>
                <th className="py-3 px-2 text-right">Avg Monthly Sales</th>
                <th className="py-3 px-2 text-right">Peak Season Sales</th>
                <th className="py-3 px-2 text-right">Demand Increase</th>
                <th className="py-3 px-2 text-right">Impact</th>
              </tr>
            </thead>

            <tbody>
              {categoryData.map((category, index) => (
                <tr className="border-t" key={index}>
                  <td className="font-semibold py-3 px-2">{category.category}</td>

                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      {getSeasonIcon(category.peakSeason)}
                      <span>{category.peakSeason || "N/A"}</span>
                    </div>
                  </td>

                  <td className="text-right text-gray-600 py-3 px-2">
                    {(category.avgSales || 0).toLocaleString()} units
                  </td>

                  <td className="text-right font-medium py-3 px-2">
                    {(category.peakSales || 0).toLocaleString()} units
                  </td>

                  <td className="text-right py-3 px-2">
                    <div className="flex items-center justify-end gap-1">
                      {getTrendIcon(category.increase || 0)}
                      <span className="font-medium text-green-700">
                        {category.increase >= 0 ? "+" : ""}
                        {category.increase || 0}%
                      </span>
                    </div>
                  </td>

                  <td className="text-right py-3 px-2 capitalize">
                    <span
                      className={`px-2 py-1 rounded-lg text-sm font-medium ${category.impact === "high"
                          ? "bg-red-100 text-red-700"
                          : category.impact === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {category.impact || "low"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PRODUCT INSIGHTS */}
      <div className="rounded-2xl bg-white shadow-sm p-4 flex flex-col gap-2">
        <div>
          <div className="flex flex-col items-start justify-between">
            <h2 className="font-bold text-lg">Product-Wise Seasonal Insights</h2>
            <span className="text-sm text-gray-600">
              Recommended stock adjustments for high-demand products
            </span>
          </div>
        </div>

        {productData.length === 0 ? (
          <p className="text-gray-500 py-6">No product data found.</p>
        ) : (
          <div className="space-y-3">
            {productData.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                  </div>

                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span className="text-sm text-gray-600">
                      {product.category || "N/A"}
                    </span>
                    <span className="text-gray-300">•</span>

                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      {getSeasonIcon(product.peakSeason)}
                      <span>Peak in {product.peakSeason || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Recommended Extra Stock</p>
                  <p className="text-lg font-semibold text-blue-700 mt-1">
                    {product.extraStock || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Seasonal;