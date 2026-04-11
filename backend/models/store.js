const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({
       name: {
              type: String,
              required: true,
              unique: false,
       },
       ownerName: {
              type: String,
              required: true,
              unique: false,
       },
       email: {
              type: String,
              required: true,
              unique: true,
       },
       phone: {
              type: String,
              required: true,
              unique: false,
       },
       address: {
              type: String,
              required: true,
              unique: false,
       },

       createdAt: {
              type: Date,
              default: Date.now,
       },
});

module.exports = mongoose.model("Store", storeSchema)