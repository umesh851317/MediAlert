const Inventory = require("../models/Inventory")

// ➕ Add medicine
exports.addItem = async (req, res) => {
  try {
    const item = await Inventory.create({
      ...req.body,
      storeId: req.user.storeId,
      userId: req.user.userId
    })

    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.addMultipleItems = async (req, res) => {
  try {
    const items = req.body   // array

    const formattedItems = items.map(item => ({
      ...item,
      userId: req.user.id,
      storeId: req.user.storeId
    }))

    const savedItems = await Inventory.insertMany(formattedItems)

    res.status(201).json(savedItems)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 📋 Get all inventory
exports.getAllItems = async (req, res) => {
  try {
    const items = await Inventory.find({
      storeId: req.user.storeId.toString()  
    }).sort({ createdAt: -1 })

    // const items = await Inventory.find()
    console.log("ALL ITEMS:", items)
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// ✏️ Update inventory
exports.updateItem = async (req, res) => {
  try {
    const updated = await Inventory.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        storeId: req.user.storeId
      },
      req.body,
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ message: "Item not found" })
    }

    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 🗑 Delete inventory
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Inventory.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
      storeId: req.user.storeId
    })

    if (!deleted) {
      return res.status(404).json({ message: "Item not found" })
    }

    res.json({ message: "Item deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


exports.searchInventory = async (req, res) => {
  try {
    const { q } = req.query;
    const storeId = req.headers["store-id"];

    if (!q) return res.json([]);

    if (!storeId) {
      return res.status(400).json({ message: "Missing storeId" });
    }

    const regex = new RegExp(q, "i");

    const items = await Inventory.find({
      storeId,
      $or: [
        { batchNumber: regex },
        { name: regex },
      ],
      quantity: { $gt: 0 },
    }).sort({ expiryDate: 1 });

    res.json(items);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: err.message });
  }
};