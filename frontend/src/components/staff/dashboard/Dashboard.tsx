"ise client"
import { AlertTriangle, Clock, Package, Plus, Receipt, RefreshCw, Scan, ShoppingBag, } from 'lucide-react'
import React, { useState } from 'react'

const Dashboard = () => {

       const recentAlerts = [
              {
                     id: 1,
                     product: 'Aspirin 500mg',
                     expiryDate: '2026-02-15',
                     status: 'Low' as const,
              },
              {
                     id: 2,
                     product: 'Ibuprofen 200mg',
                     expiryDate: '2026-02-01',
                     status: 'Expiring' as const,
              },
              {
                     id: 3,
                     product: 'Paracetamol 1g',
                     expiryDate: '2026-06-20',
                     status: 'OK' as const,
              },
              {
                     id: 4,
                     product: 'Vitamin C 1000mg',
                     expiryDate: '2026-01-28',
                     status: 'Critical' as const,
              },
              {
                     id: 5,
                     product: 'Amoxicillin 250mg',
                     expiryDate: '2026-05-10',
                     status: 'OK' as const,
              },
       ];

       const actions = [
              { icon: <Plus className="w-5 h-5" />, label: 'Add Stock', color: 'bg-blue-600 hover:bg-blue-700' },
              { icon: <RefreshCw className="w-5 h-5" />, label: 'Update Quantity', color: 'bg-indigo-600 hover:bg-indigo-700' },
              { icon: <Scan className="w-5 h-5" />, label: 'Scan Barcode', color: 'bg-purple-600 hover:bg-purple-700' },
              { icon: <Receipt className="w-5 h-5" />, label: 'Generate Bill', color: 'bg-green-600 hover:bg-green-700' },
       ];

       const expiryAlerts = [
              { name: 'Paracetamol 500mg', batch: 'BT2024-031', expiryDate: '2026-02-28', quantity: 150, daysLeft: 25, severity: 'warning' },
              { name: 'Amoxicillin 250mg', batch: 'BT2024-018', expiryDate: '2026-02-15', quantity: 80, daysLeft: 12, severity: 'critical' },
              { name: 'Ibuprofen 400mg', batch: 'BT2024-045', expiryDate: '2026-03-10', quantity: 200, daysLeft: 35, severity: 'info' },
       ];

       const lowStockAlerts = [
              { name: 'Aspirin 75mg', currentStock: 15, minStock: 50, severity: 'critical' },
              { name: 'Cetirizine 10mg', currentStock: 28, minStock: 100, severity: 'warning' },
              { name: 'Omeprazole 20mg', currentStock: 45, minStock: 75, severity: 'warning' },
       ];

       return (
              <div className='flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray'>
                     <div className=' flex flex-col'>
                            <h1 className='text-4xl'>Dashboard</h1>
                            <p className='text-sm text-gray-600'>Welcome back! Here's your pharmacy overview</p>
                     </div>
                     <div className='grid flex-wrap justify-start items-center w-full gap-5 overflow-x grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                            <div className='rounded-2xl h-32 flex justify-between items-center p-5 shrink-0 bg-white shadow-md'>
                                   <div>
                                          <p className='text-sm text-gray-600'>Low stock itme</p>
                                          <h1 className='text-4xl'>10</h1>
                                          <span className='text-gray-600 text-sm'>required attention</span>
                                   </div>
                                   <div className=''>
                                          <Package size={40} className='text-red-500' />
                                   </div>
                            </div>
                            <div className='rounded-2xl h-32 flex justify-between items-center p-5 shrink-0 bg-white shadow-md'>
                                   <div>
                                          <p className='text-sm text-gray-600'>Expiry soon</p>
                                          <h1 className='text-4xl'>20</h1>
                                          <span className='text-gray-600 text-sm'>Within 30 days</span>
                                   </div>
                                   <div className=''>
                                          <AlertTriangle size={40} />
                                   </div>
                            </div>
                            <div className='rounded-2xl h-32 flex justify-between items-center p-5 shrink-0 bg-white shadow-md'>
                                   <div>
                                          <p className='text-sm text-gray-600'>Todays sales</p>
                                          <h1 className='text-4xl'>12500 ₹</h1>
                                          <span className='text-gray-600 text-sm'>+12% from last month</span>
                                   </div>
                                   <div className=''>
                                          <Package size={40} />
                                   </div>
                            </div>
                            <div className='rounded-2xl h-32 flex justify-between items-center p-5 shrink-0 bg-white shadow-md'>
                                   <div>
                                          <p className='text-sm text-gray-600'>Pending order</p>
                                          <h1 className='text-4xl'>5</h1>
                                          <span className='text-green-600 text-sm'>Awaiting processing</span>
                                   </div>
                                   <div className=''>
                                          <ShoppingBag size={40} />
                                   </div>
                            </div>
                     </div>
                     {/* Recent alert  */}
                     <div className=' rounded-2xl bg-white p-4 flex flex-col gap-3 shadow-md'>
                            <div>
                                   <h1 className='text-2xl'>Quick action</h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                   {actions.map((action, index) => (
                                          <button
                                                 key={index}
                                                 className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white ${action.color} transition-all shadow-sm hover:shadow-md`}
                                          >
                                                 {action.icon}
                                                 <span className="font-medium">{action.label}</span>
                                          </button>
                                   ))}
                            </div>
                     </div>
                     <div className='flex gap-2 max-md:flex-col'>
                            <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                   <div className="flex items-center gap-2 mb-4">
                                          <Clock className="w-5 h-5 text-orange-600" />
                                          <h2 className="text-lg font-semibold text-gray-800">Expiring Soon</h2>
                                          <span className="ml-auto bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
                                                 {expiryAlerts.length} items
                                          </span>
                                   </div>

                                   <div className="space-y-3">
                                          {expiryAlerts.map((alert, index) => (
                                                 <div
                                                        key={index}
                                                        className={`p-4 rounded-xl border-l-4 ${alert.severity === 'critical'
                                                               ? 'bg-red-50 border-red-500'
                                                               : alert.severity === 'warning'
                                                                      ? 'bg-yellow-50 border-yellow-500'
                                                                      : 'bg-blue-50 border-blue-500'
                                                               }`}
                                                 >
                                                        <div className="flex items-start justify-between mb-2">
                                                               <div>
                                                                      <h3 className="font-medium text-gray-800">{alert.name}</h3>
                                                                      <p className="text-sm text-gray-600">Batch: {alert.batch}</p>
                                                               </div>
                                                               <span
                                                                      className={`text-xs font-semibold px-2 py-1 rounded ${alert.severity === 'critical'
                                                                             ? 'bg-red-100 text-red-700'
                                                                             : alert.severity === 'warning'
                                                                                    ? 'bg-yellow-100 text-yellow-700'
                                                                                    : 'bg-blue-100 text-blue-700'
                                                                             }`}
                                                               >
                                                                      {alert.daysLeft} days
                                                               </span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                               <span className="text-gray-600">Expires: {alert.expiryDate}</span>
                                                               <span className="text-gray-600">Qty: {alert.quantity}</span>
                                                        </div>
                                                 </div>
                                          ))}
                                   </div>

                                   {expiryAlerts.length === 0 && (
                                          <div className="text-center py-8">
                                                 <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                                 <p className="text-gray-500">No expiring items</p>
                                          </div>
                                   )}
                            </div>
                            <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                   <div className="flex items-center gap-2 mb-4">
                                          <Package className="w-5 h-5 text-red-600" />
                                          <h2 className="text-lg font-semibold text-gray-800">Low Stock Warnings</h2>
                                          <span className="ml-auto bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full">
                                                 {lowStockAlerts.length} items
                                          </span>
                                   </div>

                                   <div className="space-y-3">
                                          {lowStockAlerts.map((alert, index) => (
                                                 <div
                                                        key={index}
                                                        className={`p-4 rounded-xl border-l-4 ${alert.severity === 'critical'
                                                               ? 'bg-red-50 border-red-500'
                                                               : 'bg-yellow-50 border-yellow-500'
                                                               }`}
                                                 >
                                                        <div className="flex items-start justify-between mb-3">
                                                               <div className="flex items-center gap-2">
                                                                      <AlertTriangle
                                                                             className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                                                                                    }`}
                                                                      />
                                                                      <h3 className="font-medium text-gray-800">{alert.name}</h3>
                                                               </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                               <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                                                      <div
                                                                             className={`h-full ${alert.severity === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                                                                                    }`}
                                                                             style={{ width: `${(alert.currentStock / alert.minStock) * 100}%` }}
                                                                      ></div>
                                                               </div>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                               <span className="text-gray-600">
                                                                      Current: <span className="font-semibold">{alert.currentStock}</span>
                                                               </span>
                                                               <span className="text-gray-600">
                                                                      Min Required: <span className="font-semibold">{alert.minStock}</span>
                                                               </span>
                                                        </div>
                                                 </div>
                                          ))}
                                   </div>

                                   {lowStockAlerts.length === 0 && (
                                          <div className="text-center py-8">
                                                 <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                                 <p className="text-gray-500">All stock levels are healthy</p>
                                          </div>
                                   )}
                            </div>
                     </div>
              </div>
       )
}

export default Dashboard
