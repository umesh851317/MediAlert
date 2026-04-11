const express = require("express");
const router = express.Router();
const { getABCXYZAnalysis } = require("../controllers/analysis.controller");
const { fakeAuth } = require("../middleware/fakeAuth.middleware");

router.get("/abc-xyz", fakeAuth, getABCXYZAnalysis);

module.exports = router;