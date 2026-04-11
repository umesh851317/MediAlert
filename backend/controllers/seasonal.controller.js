const Sale = require("../models/Sale");
const Inventory = require("../models/Inventory");

const getSeason = (date) => {
  const d = new Date(date);
  const m = d.getMonth() + 1;

  if ([3, 4, 5, 6].includes(m)) return "Summer";
  if ([7, 8, 9, 10].includes(m)) return "Monsoon";
  return "Winter";
};

// ================= CATEGORY SEASONAL DATA =================
exports.getCategorySeasonalData = async (req, res) => {
  try {
    const storeId = req.headers["store-id"];

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    const sales = await Sale.find({ storeId }).populate("productId");

    const categoryMap = {};

    sales.forEach((sale) => {
      if (!sale.productId) return;

      const category = sale.productId.category || "Unknown";
      const season = getSeason(sale.date);

      if (!categoryMap[category]) {
        categoryMap[category] = {
          total: 0,
          count: 0,
          seasonData: {},
        };
      }

      // total avg calculation
      categoryMap[category].total += sale.quantitySold || 0;
      categoryMap[category].count += 1;

      // season-wise
      if (!categoryMap[category].seasonData[season]) {
        categoryMap[category].seasonData[season] = 0;
      }

      categoryMap[category].seasonData[season] += sale.quantitySold || 0;
    });

    // final output
    const result = Object.keys(categoryMap).map((category) => {
      const data = categoryMap[category];

      const avgSales =
        data.count > 0 ? Math.round(data.total / data.count) : 0;

      // find peak season
      let peakSeason = "";
      let peakSales = 0;

      for (let season in data.seasonData) {
        if (data.seasonData[season] > peakSales) {
          peakSales = data.seasonData[season];
          peakSeason = season;
        }
      }

      const increase =
        avgSales > 0
          ? Math.round(((peakSales - avgSales) / avgSales) * 100)
          : 0;

      return {
        category,
        peakSeason,
        avgSales,
        peakSales,
        increase,
        impact: increase > 80 ? "high" : increase > 40 ? "medium" : "low",
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Category Seasonal Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= PRODUCT SEASONAL INSIGHTS =================
exports.getProductSeasonalInsights = async (req, res) => {
  try {
    const storeId = req.headers["store-id"];

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    const sales = await Sale.find({ storeId }).populate("productId");

    const productMap = {};

    sales.forEach((sale) => {
      if (!sale.productId) return;

      const id = sale.productId._id.toString();
      const season = getSeason(sale.date); // ✅ FIXED

      if (!productMap[id]) {
        productMap[id] = {
          name: sale.productId.name || "Unknown Product",
          category: sale.productId.category || "Unknown",
          seasonData: {},
        };
      }

      if (!productMap[id].seasonData[season]) {
        productMap[id].seasonData[season] = 0;
      }

      productMap[id].seasonData[season] += sale.quantitySold || 0;
    });

    const result = Object.values(productMap).map((product) => {
      let peakSeason = "";
      let max = 0;

      for (let season in product.seasonData) {
        if (product.seasonData[season] > max) {
          max = product.seasonData[season];
          peakSeason = season;
        }
      }

      return {
        name: product.name,
        category: product.category,
        peakSeason,
        extraStock: Math.round(max * 0.3), // 30% extra stock
        impact: max > 200 ? "high" : max > 100 ? "medium" : "low",
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Product Seasonal Error:", err);
    res.status(500).json({ message: err.message });
  }
};