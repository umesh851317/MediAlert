const Sale = require("../models/Sale");
const mongoose = require("mongoose");

// ➕ single sale
exports.createSale = async (req, res) => {
  try {
    const storeId = req.headers["store-id"];

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    const saleData = {
      ...req.body,
      storeId,
    };

    const sale = await Sale.create(saleData);

    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// bulk sales (for Postman testing)
exports.bulkCreateSales = async (req, res) => {
  try {
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Array required" });
    }

    const storeId = req.headers["store-id"] || req.body[0]?.storeId;

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    const salesWithStore = req.body.map((sale) => {
      const saleDate = new Date(sale.date || Date.now());

      const month = `${saleDate.getFullYear()}-${String(
        saleDate.getMonth() + 1
      ).padStart(2, "0")}`;

      return {
        productId: sale.productId,
        storeId,
        quantitySold: sale.quantitySold,
        amount: sale.amount,
        date: saleDate,
        month,
      };
    });

    const sales = await Sale.insertMany(salesWithStore);

    res.status(201).json({
      message: "Bulk sales inserted",
      count: sales.length,
      sales,
    });
  } catch (err) {
    console.error("Bulk Insert Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// fetch all sales
exports.getAllSales = async (req, res) => {
  try {
    const storeId = req.headers["store-id"];

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    const sales = await Sale.find({ storeId }).sort({ saleDate: -1 });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getProductSales = async (req, res) => {
  try {
    const { productId } = req.params;
    const storeId = req.headers["store-id"];

    if (!productId) {
      return res.status(400).json({ message: "Product ID required" });
    }

    if (!storeId) {
      return res.status(400).json({ message: "Store ID required" });
    }

    const sales = await Sale.find({
      productId,
      storeId,
    })
      .select("month quantitySold -_id") // ✅ only required fields
      .sort({ month: 1 });
    // ✅ directly send array
    res.status(200).json(sales);

  } catch (err) {
    console.error("Product sales error:", err);
    res.status(500).json({ message: err.message });
  }
};