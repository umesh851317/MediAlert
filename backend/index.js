const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

// Store 
app.use("/api/store", require("./routes/store.routes"))

// AUTH
app.use("/api/auth", require("./routes/auth.routes"))

// INVENTORY
app.use("/api/inventory", require("./routes/inventory.routes"))

// BILLING
app.use("/api/billing", require("./routes/billing.routes"))

app.use("/api/forecast", require("./routes/forecast.routes"))

const salesRoutes = require("./routes/sales.routes")
app.use("/api/sales", salesRoutes)

app.use("/api/dashboard", require("./routes/dashboard.routes"))

// seasonal analysis
app.use("/api/seasonal", require("./routes/seasonal.routes"));

// analysisRoutes
app.use("/api/analysis", require("./routes/analysis.routes"));


app.get("/", (req, res) => {
  res.send("MediAlert Backend Running 🚀")
})

module.exports = app
