exports.calculateForecast = (monthlySales, currentStock) => {

  if (!monthlySales.length) {
    return {
      avgMonthly: 0,
      predictedDemand: 0,
      coverageDays: null,
      reorderLevel: 0,
      reorderQty: 0
    }
  }

  const avgMonthly =
    monthlySales.reduce((a, b) => a + b, 0) / monthlySales.length

  const avgDaily = avgMonthly / 30

  const leadTime = 7
  const safetyStock = avgDaily * 3

  const reorderLevel =
    Math.round(avgDaily * leadTime + safetyStock)

  const predictedDemand = avgMonthly   // if no growth

  const dailySales =
    predictedDemand > 0 ? predictedDemand / 30 : 0

  let coverageDays = null

  if (dailySales > 0) {
    coverageDays = Math.round(currentStock / dailySales)
  }

  let reorderQty = 0

  if (currentStock <= reorderLevel) {
    reorderQty = Math.max(
      0,
      Math.round(predictedDemand + safetyStock - currentStock)
    )
  }

  return {
    avgMonthly: Math.round(avgMonthly),
    predictedDemand: Math.round(predictedDemand),
    coverageDays,
    reorderLevel,
    reorderQty
  }
}