const Sale = require("../models/Sale");
const Inventory = require("../models/Inventory");
const mongoose = require("mongoose");

exports.getForecast = async (req, res) => {
  try {
    const storeId = req.headers["store-id"];

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    const products = await Inventory.find({ storeId });

    // Aggregate monthly sales per product for this store only
    const salesData = await Sale.aggregate([
      {
        $match: {
          storeId: new mongoose.Types.ObjectId(storeId),
        },
      },
      {
        $group: {
          _id: {
            productId: "$productId",
            month: "$month",
          },
          total: { $sum: "$quantitySold" },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const forecast = [];

    for (const product of products) {
      // ---------------- Avg Monthly sales ----------------
      const productSales = salesData.filter(
        (s) => s._id.productId.toString() === product._id.toString()
      );

      const totals = productSales.map((s) => s.total);
      const totalSales = totals.reduce((a, b) => a + b, 0);

      const avgMonthlySales =
        totals.length > 0 ? totalSales / totals.length : 0;

      // ---------------- Growth Rate ----------------
      let growthRate = 0;

      if (totals.length >= 2) {
        const last = totals[totals.length - 1];
        const prev = totals[totals.length - 2];

        if (prev > 0) {
          growthRate = (last - prev) / prev;
        }

        // Cap extreme growth (±50%)
        if (growthRate > 0.5) growthRate = 0.5;
        if (growthRate < -0.5) growthRate = -0.5;
      }

      // ---------------- Predicted Demand ----------------
      const predictedDemandRaw = avgMonthlySales * (1 + growthRate);
      const predictedDemand = Math.round(predictedDemandRaw);

      // ---------------- Coverage Days ----------------
      const dailySales = predictedDemand > 0 ? predictedDemand / 30 : 0;

      let coverageDays = null;

      if (dailySales > 0) {
        coverageDays = Math.round(product.quantity / dailySales);
      }

      // ---------------- Reorder Logic ----------------
      let reorderQty = 0;

      if (product.quantity <= product.reorderLevel) {
        reorderQty = Math.max(
          Math.ceil(predictedDemand - product.quantity + product.reorderLevel),
          0
        );
      }

      forecast.push({
        productId: product._id,
        name: product.name,
        category: product.category,
        currentStock: product.quantity,
        avgMonthlySales: Math.round(avgMonthlySales),
        predictedDemand,
        growthRate: Number((growthRate * 100).toFixed(1)),
        coverageDays,
        reorderLevel: product.reorderLevel,
        reorderQty,
      });
    }

    res.json(forecast);
  } catch (err) {
    console.error("Forecast Error:", err);
    res.status(500).json({ message: err.message });
  }
};