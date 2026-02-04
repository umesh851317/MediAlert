import { Edit, Eye } from 'lucide-react';
import React, { useState } from 'react'

const Product = () => {
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
                                   <h1 className='text-4xl'>Product</h1>
                                   <p className='text-sm text-gray-600'>Manage your pharmacy inventory</p>
                            </div>
                            <button className='border p-2 rounded-xl bg-blue-600 text-white'>+ Add Product</button>
                     </div>
                     <div className='w-full h-full bg-white shadow-md rounded-xl overflow-scroll no-scrollbar-x'>
                            <div className='h-15 px-4 flex gap-4 items-center border-b max-sm:flex-wrap max-sm:h-auto max-sm:gap-2 max-sm:py-2 '>
                                   <input
                                          type="search"
                                          placeholder="Search products, suppliers..."
                                          className=" bg-gray-50 border border-gray-400 px-1 rounded-lg w-full h-8"
                                   />
                                   <select className="w-38 h-9 px-3 py-2 text-md border rounded-xl">
                                          <option value="all">All product</option>
                                          <option value="pain-relief">Valid Products</option>
                                          <option value="pain-relief">Expired Products</option>
                                   </select>
                                   <select className="w-38 h-9 px-3 py-2 text-md border rounded-xl">
                                          <option value="all">All Categories</option>
                                          <option value="pain-relief">Pain Relief</option>
                                          <option value="antibiotics">Antibiotics</option>
                                          <option value="vitamins">Vitamins</option>
                                          <option value="first-aid">First Aid</option>
                                          <option value="Antihistamines">Antihistamines</option>
                                   </select>
                                   <select className="w-38 h-9 px-3 py-2 text-md border rounded-xl">
                                          <option value="all">All Status</option>
                                          <option value="available">Available</option>
                                          <option value="low">Low Stock</option>
                                          <option value="out">Out of Stock</option> 
                                   </select>
                            </div>
                            <table className="w-full border-collapse overflow-hidden">
                                   <thead>
                                          <tr className="h-15 text-left bg-gray-100 wrap-break-words">
                                                 <th className="px-4 py-2 w-50">Product Name</th>
                                                 <th className="px-4 py-2">Category</th>
                                                 <th className="px-4 py-2">Batch Number</th>
                                                 <th className="px-4 py-2">Expiry Date</th>
                                                 <th className="px-4 py-2 w-30">Current Stock</th>
                                                 {/* <th className="px-4 py-2 w-35 wrap-break-words whitespace-normal">Days Remaining</th> */}
                                                 <th className="text-start">Status</th>
                                                 <th className="px-4 py-2 text-right">Actions</th>
                                          </tr>
                                   </thead>

                                   <tbody>
                                          {
                                                 medicines.map((items: any) => (
                                                        <tr key={items.id} className={`h-15 border-t ${items.status === "expired" ? "bg-red-100 hover:bg-red-200" : "bg-white"}`}>
                                                               <td className="px-4 py-2 w-30">{items.productName}</td>
                                                               <td className="px-4 py-2">{items.category}</td>
                                                               <td className="px-4 py-2">{items.batchNumber}</td>
                                                               <td className="px-4 py-2">{items.expiryDate}</td>
                                                               <td className="px-4 py-2">{items.quantity}</td>
                                                               {/* <td
                                                                      className={`px-4 py-4 ${items.status === 'expired'
                                                                             ? 'text-red-600 font-semibold'
                                                                             : items.status === 'expiring-soon' ?
                                                                                    'text-yellow-600' : 'text-green-400'
                                                                             }`}
                                                               >
                                                                      {items.status === 'expired'
                                                                             ? `${Math.abs(items.daysRemaining)} days ago`
                                                                             : `${items.daysRemaining} days left`}
                                                               </td> */}

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
                                                               <td className="px-4 py-2 text-right flex justify-center gap-5">
                                                                      <button className='text-gray-500'>
                                                                             <Eye size={20} />
                                                                      </button>
                                                                      {/* <button className="text-gray-600 hover:underline">
                                                                             <Edit size={20} />
                                                                      </button> */}
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

export default Product
