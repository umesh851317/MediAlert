const express = require("express");
const router = express.Router();

const { createStore, getStores } = require("../controllers/store.controller");

router.post("/", createStore);
router.get("/", getStores);

module.exports = router;