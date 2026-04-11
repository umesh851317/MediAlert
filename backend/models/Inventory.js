const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema(
       {
              storeId: {   
                     type: mongoose.Schema.Types.ObjectId,
                     ref: "Store",
                     required: true
              },
              name: {
                     type: String,
                     required: true
              },
              category: {
                     type: String,
                     required: true
              },
              brand: String,

              batchNumber: {
                     type: String,
                     required: true
              },
              expiryDate: {
                     type: Date,
                     required: true
              },

              quantity: {
                     type: Number,
                     required: true
              },
              reorderLevel: {
                     type: Number,
                     default: false
              },

              purchasePrice: {
                     type: Number,
                     required: true
              },
              sellingPrice: {
                     type: Number,
                     required: true
              },

              supplierName: String,

              unit: {
                     type: String,
                     enum: ["tablet", "bottle", "vial", "tube","capsule","piece","box"],
                     required: true,
              },
              packSize: {
                     type: Number, // tablets per strip
                     default: 1,
              }

       },
       { timestamps: true }
)

module.exports = mongoose.model("Inventory", inventorySchema)
