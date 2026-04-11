const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected")
    console.log("CONNECTED DB ", mongoose.connection.name)
  } catch (error) {
    console.error("MongoDB Error:", error.message)
    process.exit(1)
  }
}

module.exports = connectDB
