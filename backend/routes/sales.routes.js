const express = require("express")
const router = express.Router()
const {
       createSale,
       bulkCreateSales,
       getAllSales,
} = require("../controllers/sales.controller")

// POST single sale
router.post("/", createSale)

// POST bulk sales (Postman testing)
router.post("/bulk", bulkCreateSales)

// GET all sales (forecasting)
router.get("/", getAllSales)

module.exports = router
