require("dotenv").config()
const app = require("./index")
console.log("JWT_SECRET =", process.env.JWT_SECRET);
const connectDB = require("./config/db")

connectDB()

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  
})
