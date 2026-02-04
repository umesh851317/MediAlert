import SalesForecastChart from '@/app/chart/SalesForecastChart';
import { Edit, Eye, Package, Search, TrendingDown, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'

const Forecast = () => {
       const products = [
              {
                     id: 1,
                     name: 'Paracetamol 500mg',
                     category: 'Pain Relief',
                     avgMonthlySales: 1850,
                     predictedDemand: 2100,
                     reorderQty: 2500,
                     confidence: 'High' as const,
                     isFastMoving: true,
              },
              {
                     id: 2,
                     name: 'Amoxicillin 250mg',
                     category: 'Antibiotics',
                     avgMonthlySales: 980,
                     predictedDemand: 1150,
                     reorderQty: 1400,
                     confidence: 'High' as const,
                     isFastMoving: true,
              },
              {
                     id: 3,
                     name: 'Metformin 500mg',
                     category: 'Diabetes Care',
                     avgMonthlySales: 1620,
                     predictedDemand: 1680,
                     reorderQty: 2000,
                     confidence: 'Medium' as const,
                     isFastMoving: true,
              },
              {
                     id: 4,
                     name: 'Vitamin D3 1000IU',
                     category: 'Vitamins',
                     avgMonthlySales: 720,
                     predictedDemand: 850,
                     reorderQty: 1000,
                     confidence: 'Medium' as const,
                     isFastMoving: false,
              },
              {
                     id: 5,
                     name: 'Lisinopril 10mg',
                     category: 'Heart Health',
                     avgMonthlySales: 1340,
                     predictedDemand: 1420,
                     reorderQty: 1700,
                     confidence: 'High' as const,
                     isFastMoving: true,
              },
              {
                     id: 6,
                     name: 'Omeprazole 20mg',
                     category: 'Digestive Health',
                     avgMonthlySales: 890,
                     predictedDemand: 920,
                     reorderQty: 1100,
                     confidence: 'Medium' as const,
                     isFastMoving: false,
              },
              {
                     id: 7,
                     name: 'Ibuprofen 400mg',
                     category: 'Pain Relief',
                     avgMonthlySales: 1540,
                     predictedDemand: 1780,
                     reorderQty: 2100,
                     confidence: 'High' as const,
                     isFastMoving: true,
              },
              {
                     id: 8,
                     name: 'Atorvastatin 20mg',
                     category: 'Heart Health',
                     avgMonthlySales: 1120,
                     predictedDemand: 1180,
                     reorderQty: 1400,
                     confidence: 'Medium' as const,
                     isFastMoving: false,
              },
              {
                     id: 9,
                     name: 'Cetirizine 10mg',
                     category: 'Allergy',
                     avgMonthlySales: 650,
                     predictedDemand: 580,
                     reorderQty: 700,
                     confidence: 'Low' as const,
                     isFastMoving: false,
              },
              {
                     id: 10,
                     name: 'Aspirin 75mg',
                     category: 'Heart Health',
                     avgMonthlySales: 950,
                     predictedDemand: 1020,
                     reorderQty: 1200,
                     confidence: 'High' as const,
                     isFastMoving: false,
              },
       ];
       const chartData = {
              labels: [
                     'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025',
                     'Dec 2025', 'Jan 2026', 'Feb 2026',
                     'Mar 2026', 'Apr 2026', 'May 2026'
              ],
              historical: [100, 98, 95, 105, 115, 108, 102, null, null, null],
              predicted: [null, null, null, null, null, null, 102, 108, 115, 120]
       }
       return (
              <div className='flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray'>
                     <div className=' flex justify-between items-center'>
                            <div className='flex flex-col'>
                                   <h1 className='text-4xl'>Sales Forecasting</h1>
                                   <p className='text-sm text-gray-600'>Predict demand and optimize inventory based on historical trends</p>
                            </div>
                     </div>
                     <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-5'>
                            <div className=' flex justify-between items-center p-3 rounded-xl bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600 text-lg'>Expected Stock Requirement</span>
                                          <span className='font-bold'>2,840 units</span>
                                          <p className='text-sm'>
                                                 <span className='text-green-500'>+8.2% </span>
                                                 <span>from last month</span>
                                          </p>
                                   </div>
                                   <div>
                                          <Package size={40} className=' p-1 bg-blue-50 text-blue-700 rounded-lg' />
                                   </div>
                            </div>

                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Fast-Moving Products</span>
                                          <span className='font-bold'>48 items</span>
                                          <p className='text-sm'>
                                                 <span className='text-green-500'>+5 this month </span>
                                                 <span>from last month</span>
                                          </p>
                                   </div>
                                   <div>
                                          <TrendingUp size={40} className=' p-1 bg-yellow-100 text-yellow-700 rounded-lg' />
                                   </div>
                            </div>
                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Slow-Moving Products</span>
                                          <span className='font-bold'>12 items</span>
                                          <p className='text-sm'>
                                                 <span className='text-red-500'>-3 this month </span>
                                                 <span>from last month</span>
                                          </p>
                                   </div>
                                   <div>
                                          <TrendingDown size={40} className=' p-1 bg-red-50 text-red-500 rounded-lg' />
                                   </div>
                            </div>

                     </div>
                     <div className='w-full h-full bg-white shadow-md rounded-xl overflow-scroll no-scrollbar-x'>
                            <SalesForecastChart data={chartData} />
                     </div>
                     <div className='w-full h-full bg-white shadow-md rounded-xl overflow-scroll no-scrollbar-x'>
                            <div className='h-15 px-4 flex gap-4 items-center border-b max-sm:flex-wrap max-sm:h-auto max-sm:gap-2 max-sm:py-2 '>
                                   <div className="w-full flex items-center justify-between">
                                          <h2 className="text-lg font-semibold text-gray-900">Product-Wise Forecast</h2>

                                          <div className="relative">
                                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                 <input
                                                        type="text"
                                                        placeholder="Search products..."
                                                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                 />
                                          </div>
                                   </div>
                            </div>
                            <table className="w-full">
                                   <thead className="bg-gray-50 border-b border-gray-200">
                                          <tr>
                                                 <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Product Name
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Category
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Avg Monthly Sales
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Predicted Demand
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Reorder Quantity
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        Forecast Confidence
                                                 </th>
                                          </tr>
                                   </thead>
                                   <tbody className="divide-y divide-gray-200">
                                          {products.map((product) => (
                                                 <tr
                                                        key={product.id}
                                                        className={`hover:bg-gray-50 transition-colors ${product.isFastMoving ? 'bg-blue-50/30' : ''
                                                               }`}
                                                 >
                                                        <td className="px-6 py-4">
                                                               <div className="flex items-center gap-2">
                                                                      <span className="font-medium text-gray-900">{product.name}</span>
                                                                      {product.isFastMoving && (
                                                                             <TrendingUp className="w-4 h-4 text-green-600" />
                                                                      )}
                                                               </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                               <span className="text-gray-600">{product.category}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                               <span className="text-gray-900 font-medium">
                                                                      {product.avgMonthlySales.toLocaleString()} units
                                                               </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                               <div className="flex items-center gap-2">
                                                                      <span className="text-gray-900 font-medium">
                                                                             {product.predictedDemand.toLocaleString()} units
                                                                      </span>
                                                                      {product.predictedDemand > product.avgMonthlySales && (
                                                                             <span className="text-xs text-green-600 font-medium">
                                                                                    +{(((product.predictedDemand - product.avgMonthlySales) / product.avgMonthlySales) * 100).toFixed(1)}%
                                                                             </span>
                                                                      )}
                                                               </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                               <span className={`px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium 
                                                                      `}>
                                                                      {product.reorderQty.toLocaleString()} units
                                                               </span>
                                                        </td>
                                                        <td className={`px-6 py-4 `}>
                                                               <span className={`px-2 py-1 rounded-lg
                                                                       ${product.confidence === "High" ? "bg-green-100 text-green-600" :
                                                                             product.confidence === "Low" ? "bg-red-200 text-red-500" : "bg-yellow-100 text-yellow-500"}`}>
                                                                      {(product.confidence)}</span>
                                                        </td>
                                                 </tr>
                                          ))}
                                   </tbody>
                            </table>

                     </div>
              </div>
       )
}

export default Forecast
