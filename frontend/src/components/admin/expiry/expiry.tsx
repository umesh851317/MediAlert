import React, { useState } from 'react'
import { AlertCircle, AlertTriangle, Clock, Edit, Eye, Package, Trash2, XCircle } from 'lucide-react'
const Expiry = () => {
       const mockProducts = [
              {
                     id: 1,
                     name: 'Aspirin 500mg',
                     category: 'Pain Relief',
                     quantity: 150,
                     Batch: "BATCH-2025-0001",
                     MinLevel: 50,
                     expiryDate: '2026-12-31',
                     status: 'OK',
              },
              {
                     id: 2,
                     name: 'Ibuprofen 200mg',
                     category: 'Pain Relief',
                     quantity: 45,
                     Batch: "BATCH-2024-0002",
                     MinLevel: 50,
                     expiryDate: '2026-03-15',
                     status: 'Low',
              },
              {
                     id: 3,
                     name: 'Vitamin C 1000mg',
                     category: 'Vitamins',
                     quantity: 0,
                     Batch: "BATCH-2026-0003",
                     MinLevel: 50,
                     expiryDate: '2027-01-20',
                     status: 'Out of Stock',
              },
              {
                     id: 4,
                     name: 'Amoxicillin 250mg',
                     category: 'Antibiotics',
                     quantity: 220,
                     Batch: "BATCH-2022-0002",
                     MinLevel: 50,
                     expiryDate: '2026-02-10',
                     status: 'Expiring',
              },
              {
                     id: 5,
                     name: 'Paracetamol 1g',
                     category: 'Pain Relief',
                     quantity: 380,
                     Batch: "BATCH-2024-0023",
                     MinLevel: 50,
                     expiryDate: '2027-06-30',
                     status: 'OK',
              },
       ];
       const [medicines, setMedicines] = useState([
              {
                     id: '1',
                     productName: 'Amoxicillin 500mg',
                     category: 'Antibiotics',
                     batchNumber: 'BT2024-001',
                     expiryDate: '2026-02-28',
                     daysRemaining: 27,
                     quantity: 450,
                     status: 'expiring-soon'
              },
              {
                     id: '2',
                     productName: 'Paracetamol 650mg',
                     category: 'Analgesics',
                     batchNumber: 'BT2023-145',
                     expiryDate: '2026-01-15',
                     daysRemaining: -17,
                     quantity: 120,
                     status: 'expired'
              },
              {
                     id: '3',
                     productName: 'Ibuprofen 400mg',
                     category: 'Anti-inflammatory',
                     batchNumber: 'BT2024-089',
                     expiryDate: '2026-02-10',
                     daysRemaining: 9,
                     quantity: 280,
                     status: 'expiring-soon'
              },
              {
                     id: '4',
                     productName: 'Cetirizine 10mg',
                     category: 'Antihistamines',
                     batchNumber: 'BT2024-234',
                     expiryDate: '2026-04-15',
                     daysRemaining: 73,
                     quantity: 600,
                     status: 'safe'
              },
              {
                     id: '5',
                     productName: 'Metformin 500mg',
                     category: 'Antidiabetic',
                     batchNumber: 'BT2023-098',
                     expiryDate: '2026-01-25',
                     daysRemaining: -7,
                     quantity: 95,
                     status: 'expired'
              },
              {
                     id: '6',
                     productName: 'Aspirin 75mg',
                     category: 'Antiplatelet',
                     batchNumber: 'BT2024-156',
                     expiryDate: '2026-02-20',
                     daysRemaining: 19,
                     quantity: 340,
                     status: 'expiring-soon'
              },
              {
                     id: '7',
                     productName: 'Omeprazole 20mg',
                     category: 'Proton Pump Inhibitor',
                     batchNumber: 'BT2024-201',
                     expiryDate: '2026-05-10',
                     daysRemaining: 98,
                     quantity: 520,
                     status: 'safe'
              },
              {
                     id: '8',
                     productName: 'Azithromycin 250mg',
                     category: 'Antibiotics',
                     batchNumber: 'BT2023-112',
                     expiryDate: '2026-01-20',
                     daysRemaining: -12,
                     quantity: 75,
                     status: 'expired'
              },
              {
                     id: '9',
                     productName: 'Losartan 50mg',
                     category: 'Antihypertensive',
                     batchNumber: 'BT2024-177',
                     expiryDate: '2026-02-05',
                     daysRemaining: 4,
                     quantity: 210,
                     status: 'expiring-soon'
              },
              {
                     id: '10',
                     productName: 'Atorvastatin 20mg',
                     category: 'Statins',
                     batchNumber: 'BT2024-289',
                     expiryDate: '2026-06-30',
                     daysRemaining: 149,
                     quantity: 780,
                     status: 'safe'
              }
       ]);
       return (
              <div className='flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray'>
                     <div className=' flex justify-between items-center'>
                            <div className='flex flex-col'>
                                   <h1 className='text-4xl'>Expiry Alerts</h1>
                                   <p className='text-sm text-gray-600'>Monitor and manage medicines nearing or past expiration</p>
                            </div>

                     </div>
                     <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-5'>
                            <div className=' flex justify-between items-center p-3 rounded-xl bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600 text-lg'>Expiring in 30 Days</span>
                                          <span className='font-bold'>15</span>
                                          <span className='text-sm'>medicine</span>
                                   </div>
                                   <div>
                                          <Clock size={40} className=' p-1 bg-blue-50 text-blue-700 rounded-lg' />
                                   </div>
                            </div>
                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Expiring in 7 Days</span>
                                          <span className='font-bold'>5</span>
                                          <span className='text-sm'>medicine</span>
                                   </div>
                                   <div>
                                          <AlertTriangle size={40} className=' p-1 bg-yellow-100 text-yellow-700 rounded-lg' />
                                   </div>
                            </div>
                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Already Expired</span>
                                          <span className='font-bold'>3</span>
                                          <span className='text-sm'>medicine</span>
                                   </div>
                                   <div>
                                          <XCircle size={40} className=' p-1 bg-red-50 text-red-500 rounded-lg' />
                                   </div>
                            </div>

                     </div>


                     <div className='w-full h-full bg-white shadow-md rounded-xl overflow-scroll no-scrollbar-x'>
                            <div className='h-15 px-4 flex gap-4 items-center border-b max-sm:flex-wrap max-sm:h-auto max-sm:gap-2 max-sm:py-2 '>
                                   <input
                                          type="search"
                                          placeholder="Search products, suppliers..."
                                          className=" bg-gray-50 border border-gray-400 px-1 rounded-lg w-full h-8"
                                   />
                                   <select className="w-38 h-9 px-3 py-2 text-md border rounded-xl">
                                          <option value="all">All Days</option>
                                          <option value="pain-relief">7 Days</option>
                                          <option value="antibiotics">14 Days</option>
                                          <option value="vitamins">30 Days</option>
                                          <option value="first-aid">First Aid</option>
                                   </select>
                                   <select className="w-38 h-9 px-3 py-2 text-md border rounded-xl">
                                          <option value="all">All Categories</option>
                                          <option value="pain-relief">Pain Relief</option>
                                          <option value="antibiotics">Antibiotics</option>
                                          <option value="vitamins">Vitamins</option>
                                          <option value="first-aid">First Aid</option>
                                   </select>
                                   <select className="w-38 h-9 px-3 py-2 text-md border rounded-xl">
                                          <option value="all">All status</option>
                                          <option value="pain-relief">In stock</option>
                                          <option value="antibiotics">Out of stock</option>
                                          <option value="vitamins">Expiring</option>
                                   </select>
                            </div>
                            <table className="w-full border-collapse overflow-hidden">
                                   <thead>
                                          <tr className="h-15 text-left bg-gray-100 wrap-break-words">
                                                 <th className="px-4 py-2 w-50">Product Name</th>
                                                 <th className="px-4 py-2">Category</th>
                                                 <th className="px-4 py-2">Batch Number</th>
                                                 <th className="px-4 py-2">Expiry Date</th>
                                                 <th className="px-4 py-2">Quantity</th>
                                                 <th className="px-4 py-2 w-35 wrap-break-words whitespace-normal">Days Remaining</th>
                                                 <th className="text-start">Status</th>
                                                 <th className="px-4 py-2 text-right">Actions</th>
                                          </tr>
                                   </thead>

                                   <tbody>
                                          {
                                                 medicines.map((items) => (
                                                        <tr key={items.id} className={`h-15 border-t ${items.status === "expired" ? "bg-red-100 hover:bg-red-200" : "bg-white"}`}>
                                                               <td className="px-4 py-2 w-30">{items.productName}</td>
                                                               <td className="px-4 py-2">{items.category}</td>
                                                               <td className="px-4 py-2">{items.batchNumber}</td>
                                                               <td className="px-4 py-2">{items.expiryDate}</td>
                                                               <td className="px-4 py-2">{items.quantity}</td>
                                                               <td
                                                                      className={`px-4 py-4 ${items.status === 'expired'
                                                                                    ? 'text-red-600 font-semibold'
                                                                             : items.status === 'expiring-soon' ? 
                                                                                    'text-yellow-600':'text-green-400'
                                                                             }`}
                                                               >
                                                                      {items.status === 'expired'
                                                                             ? `${Math.abs(items.daysRemaining)} days ago`
                                                                             : `${items.daysRemaining} days left`}
                                                               </td>

                                                               <td className='text-start' >
                                                                      <span className={`text-center text-green-600 font-medium border px-1 py-0.5 text-sm rounded-lg 
                                                                      ${items.status === "expiring-soon"
                                                                                    ? "text-amber-500 bg-amber-100"
                                                                                    : items.status === "Out of Stock" || items.status === "expired"
                                                                                           ? "text-red-500 bg-red-100"
                                                                                           : "text-green-500 bg-green-100"
                                                                             }`}>

                                                                             {items.status}
                                                                      </span>
                                                               </td>
                                                               <td className="px-4 py-2 text-right flex justify-end gap-5">
                                                                      <button className='text-gray-500'>
                                                                             <Eye size={20} />
                                                                      </button>
                                                                      <button className="text-gray-600 hover:underline">
                                                                             <Edit size={20} />
                                                                      </button>
                                                               </td>
                                                        </tr>
                                                 ))
                                          }
                                   </tbody>
                            </table>

                     </div>
              </div>
       )
}

export default Expiry
