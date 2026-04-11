const Inventory = require("../models/Inventory")
const Sale = require("../models/Sale")

exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date()

    const next6Months = new Date()
    next6Months.setMonth(today.getMonth() + 6)

    // Total products
    const totalProducts = await Inventory.countDocuments()

    // Low stock
    const lowStock = await Inventory.countDocuments({
      $expr: { $lte: ["$quantity", "$reorderLevel"] },
    })

    // expired in 6 months
    const expiredSoon = new Date(today);
    expiredSoon.setMonth(expiredSoon.getMonth() + 6);

    const expiringIn6Months = await Inventory.countDocuments({
      expiryDate: {
        $gte: today,
        $lte: expiredSoon,
      },
    });

    // Expired
    const expired = await Inventory.countDocuments({
      expiryDate: { $lt: today },
    })

    // Recent alerts 
    const recentAlerts = await Inventory.aggregate([
      {
        $addFields: {
          alertType: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$quantity", 0] },
                  then: "out"
                },
                {
                  case: { $lt: ["$expiryDate", today] },
                  then: "expired"
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$expiryDate", today] },
                      { $lte: ["$expiryDate", next6Months] }
                    ]
                  },
                  then: "expiring"
                },
                {
                  case: { $lte: ["$quantity", "$reorderLevel"] },
                  then: "low"
                }
              ],
              default: "safe"
            }
          },
          priority: {
            $switch: {
              branches: [
                { case: { $eq: ["$quantity", 0] }, then: 1 },
                { case: { $lt: ["$expiryDate", today] }, then: 2 },
                {
                  case: {
                    $and: [
                      { $gte: ["$expiryDate", today] },
                      { $lte: ["$expiryDate", next6Months] }
                    ]
                  },
                  then: 3
                },
                { case: { $lte: ["$quantity", "$reorderLevel"] }, then: 4 }
              ],
              default: 5
            }
          }
        }
      },
      { $match: { priority: { $lte: 4 } } },
      { $sort: { priority: 1, updatedAt: -1 } },
      { $limit: 10 }
    ])

    res.json({
      totalProducts,
      lowStock,
      expired,
      expiringIn6Months,
      recentAlerts,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
