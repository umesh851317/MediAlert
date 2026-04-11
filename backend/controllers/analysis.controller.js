const Sale = require("../models/Sale");
const Inventory = require("../models/Inventory");

const getABCXYZAnalysis = async (req, res) => {
  try {
    const storeId = req.user.storeId;

    // Last 12 months
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1);

    const sales = await Sale.find({
      storeId,
      date: { $gte: startDate }
    });

    const inventory = await Inventory.find({ storeId });

    const inventoryMap = {};
    inventory.forEach((item) => {
      inventoryMap[item._id.toString()] = item;
    });

    // Generate all 12 months
    const months = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months.unshift(monthStr);
    }

    // Group sales by productId
    const productMap = {};

    sales.forEach((sale) => {
      const productId = sale.productId.toString();

      if (!productMap[productId]) {
        productMap[productId] = {
          productId,
          totalQuantity: 0,
          totalValue: 0,
          monthlyDemand: {},
        };

        // initialize all months as 0
        months.forEach((m) => {
          productMap[productId].monthlyDemand[m] = 0;
        });
      }

      productMap[productId].totalQuantity += sale.quantitySold;
      productMap[productId].totalValue += sale.amount;
      productMap[productId].monthlyDemand[sale.month] += sale.quantitySold;
    });

    let products = Object.values(productMap);

    // Add missing products from inventory with zero sales
    inventory.forEach((item) => {
      const productId = item._id.toString();

      if (!productMap[productId]) {
        const monthlyDemand = {};
        months.forEach((m) => (monthlyDemand[m] = 0));

        products.push({
          productId,
          totalQuantity: 0,
          totalValue: 0,
          monthlyDemand,
        });
      }
    });

    // XYZ calculation
    products = products.map((p) => {
      const values = months.map((m) => p.monthlyDemand[m] || 0);

      const mean = values.reduce((a, b) => a + b, 0) / values.length;

      const variance =
        values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;

      const stdDev = Math.sqrt(variance);
      const cv = mean === 0 ? 999 : (stdDev / mean) * 100;

      return {
        ...p,
        monthlyDemandArray: values,
        mean: Number(mean.toFixed(2)),
        stdDev: Number(stdDev.toFixed(2)),
        cv: Number(cv.toFixed(2)),
      };
    });

    // ABC calculation
    products.sort((a, b) => b.totalValue - a.totalValue);

    const totalInventoryValue = products.reduce((sum, p) => sum + p.totalValue, 0);
    let cumulativeValue = 0;

    products = products.map((p) => {
      cumulativeValue += p.totalValue;
      const cumulativePercent =
        totalInventoryValue === 0 ? 0 : (cumulativeValue / totalInventoryValue) * 100;

      let abcClass = "C";
      if (cumulativePercent <= 80) abcClass = "A";
      else if (cumulativePercent <= 95) abcClass = "B";

      return {
        ...p,
        cumulativePercent: Number(cumulativePercent.toFixed(2)),
        abcClass,
      };
    });

    // XYZ class
    products = products.map((p) => {
      let xyzClass = "Z";

      if (p.cv <= 20) xyzClass = "X";
      else if (p.cv <= 50) xyzClass = "Y";

      const inventoryItem = inventoryMap[p.productId];

      return {
        ...p,
        xyzClass,
        finalClass: `${p.abcClass}${xyzClass}`,
        name: inventoryItem?.name || "Unknown",
        category: inventoryItem?.category || "",
        brand: inventoryItem?.brand || "",
        sellingPrice: inventoryItem?.sellingPrice || 0,
        currentStock: inventoryItem?.quantity || 0,
        reorderLevel: inventoryItem?.reorderLevel || 0,
      };
    });

    // Matrix summary
    const matrix = {
      AX: 0, AY: 0, AZ: 0,
      BX: 0, BY: 0, BZ: 0,
      CX: 0, CY: 0, CZ: 0,
    };

    products.forEach((p) => {
      if (matrix[p.finalClass] !== undefined) {
        matrix[p.finalClass]++;
      }
    });

    // Summary cards
    const summary = {
      totalProducts: products.length,
      highValueItems: products.filter((p) => p.abcClass === "A").length,
      stableDemandItems: products.filter((p) => p.xyzClass === "X").length,
      highRiskItems: products.filter((p) => p.finalClass === "CZ").length,
    };

    res.status(200).json({
      success: true,
      summary,
      matrix,
      products,
    });
  } catch (error) {
    console.error("ABC-XYZ Analysis Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate ABC-XYZ analysis",
      error: error.message,
    });
  }
};

module.exports = { getABCXYZAnalysis };