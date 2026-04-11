const Bill = require("../models/Bill");
const Inventory = require("../models/Inventory");
const Sale = require("../models/Sale");

exports.createBill = async (req, res) => {
  try {
    const { items, userId } = req.body;
    const storeId = req.headers["store-id"] || req.body.storeId;

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in bill" });
    }

    // Fetch all required products in one query
    const productIds = items.map((item) => item.productId);

    const products = await Inventory.find({
      _id: { $in: productIds },
      storeId,
    });

    const productMap = {};
    products.forEach((product) => {
      productMap[product._id.toString()] = product;
    });

    let totalAmount = 0;
    const billItems = [];
    const salesData = [];

    const saleDate = new Date();
    const month = `${saleDate.getFullYear()}-${String(
      saleDate.getMonth() + 1
    ).padStart(2, "0")}`;

    for (const item of items) {
      const product = productMap[item.productId];

      if (!product) {
        return res.status(404).json({
          message: `Product not found for ID: ${item.productId}`,
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      const baseAmount = item.quantity * product.sellingPrice;
      const itemTax = baseAmount * 0.05;
      const finalAmount = Math.round(baseAmount + itemTax);

      totalAmount += finalAmount;

      // Save clean item in bill
      billItems.push({
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        price: product.sellingPrice,
      });

      // Reduce stock
      product.quantity -= item.quantity;

      // Sales entry
      salesData.push({
        productId: item.productId,
        storeId,
        quantitySold: item.quantity,
        amount: finalAmount,
        date: saleDate,
        month,
      });
    }

    // Save updated inventory
    await Promise.all(products.map((product) => product.save()));

    // Save bill
    const bill = await Bill.create({
      userId,
      storeId,
      items: billItems,
      totalAmount,
    });

    // Save sales
    await Sale.insertMany(salesData);

    res.status(201).json({
      message: "Bill created & sales recorded successfully",
      bill,
    });
  } catch (err) {
    console.error("Create Bill Error:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.addMultipleBills = async (req, res) => {
  try {
    const bills = req.body; // array of bills

    if (!Array.isArray(bills) || bills.length === 0) {
      return res.status(400).json({ message: "Bills array is required" });
    }

    const formattedBills = bills.map((bill) => ({
      userId: bill.userId,
      storeId: bill.storeId,
      items: bill.items,
      totalAmount: bill.totalAmount,
      createdAt: bill.createdAt || new Date(),
      updatedAt: bill.updatedAt || new Date(),
    }));

    const savedBills = await Bill.insertMany(formattedBills);

    res.status(201).json({
      message: "Bulk bills inserted successfully",
      count: savedBills.length,
      bills: savedBills,
    });
  } catch (err) {
    console.error("Add Multiple Bills Error:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.getMonthlyRevenue = async (req, res) => {
  try {
    const storeId = req.user.storeId;

    const bills = await Bill.find({ storeId }).sort({ createdAt: 1 });

    if (!bills.length) {
      return res.status(200).json({
        success: true,
        monthlyRevenue: [],
      });
    }

    const revenueMap = {};

    bills.forEach((bill) => {
      const date = new Date(bill.createdAt);

      const month = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      if (!revenueMap[month]) {
        revenueMap[month] = 0;
      }

      revenueMap[month] += bill.totalAmount;
    });

    const monthlyRevenue = Object.entries(revenueMap).map(([month, revenue]) => ({
      month,
      revenue,
    }));

    res.status(200).json({
      success: true,
      monthlyRevenue,
    });
  } catch (err) {
    console.error("Monthly Revenue Error:", err);
    res.status(500).json({ message: err.message });
  }
};
exports.billHistory = async (req, res) => {
  try {
    const storeId = req.headers["store-id"];
    const userId = req.headers["user-id"];

    if (!storeId) {
      return res.status(400).json({ message: "Store ID is required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const bills = await Bill.find({ storeId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bills,
    });
  } catch (err) {
    console.error("Billing history Error:", err);
    res.status(500).json({ message: err.message });
  }
};