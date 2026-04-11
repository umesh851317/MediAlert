const express = require("express");
const router = express.Router();
const {
  getCategorySeasonalData,
  getProductSeasonalInsights,
} = require("../controllers/seasonal.controller");

router.get("/category", getCategorySeasonalData);
router.get("/products", getProductSeasonalInsights);

module.exports = router;