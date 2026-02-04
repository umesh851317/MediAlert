'use client'

import '../../lib/chartConfig'
import { Line } from 'react-chartjs-2'

type SalesForecastChartProps = {
  data: {
    labels: string[]
    historical: (number | null)[]
    predicted: (number | null)[]
  }
}

export default function SalesForecastChart({
  data,
}: SalesForecastChartProps) {

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Historical Sales',
        data: data.historical,
        borderColor: '#2563eb',
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: 'Predicted Sales',
        data: data.predicted,
        borderColor: '#dc2626',
        borderDash: [6, 6],
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' as const },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Sales (in thousands)',
        },
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        Sales Forecast Trend
      </h2>
      <Line data={chartData} options={options} />
    </div>
  )
}
