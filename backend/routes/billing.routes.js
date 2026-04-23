const express = require("express")
const router = express.Router()
const {
       createBill,
       addMultipleBills,
       getMonthlyRevenue,
       billHistory,
       productBillHistory
} = require("../controllers/billing.controller")

const { fakeAuth } = require("../middleware/fakeAuth.middleware");

router.post("/", createBill)
router.post("/addMultiple", fakeAuth, addMultipleBills);
router.get("/monthly-revenue", fakeAuth, getMonthlyRevenue);
router.get("/billHistory", billHistory);
router.get("/billHistory/:productId", productBillHistory);

module.exports = router
