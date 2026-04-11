require("dotenv").config()
const app = require("./index")
const connectDB = require("./config/db")

connectDB()

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
