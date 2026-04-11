const express = require("express")
const router = express.Router()
const { fakeAuth } = require("../middleware/fakeAuth.middleware");

const {
  addItem,
  addMultipleItems,
  getAllItems,
  updateItem,
  deleteItem,
  searchInventory,
} = require("../controllers/inventory.controller")

router.post("/", fakeAuth, addItem)
router.post("/bulk", fakeAuth, addMultipleItems)
router.get("/", fakeAuth, getAllItems)
router.get("/search", fakeAuth, searchInventory)
router.put("/:id", fakeAuth, updateItem)
router.delete("/:id", fakeAuth, deleteItem)

module.exports = router