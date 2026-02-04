"use client";
import { AlertCircle, Edit, Eye, Package, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import AddCompo from '../component/addComponent/addCompo';

const Stoke = () => {
       const [open, setOpen] = useState(false);

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
       return (
              <div className='flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray'>
                     <div className=' flex justify-between items-center'>
                            <div className='flex flex-col'>
                                   <h1 className='text-4xl'>Product</h1>
                                   <p className='text-sm text-gray-600'>Manage your pharmacy inventory</p>
                            </div>
                            <button onClick={() => setOpen(true)}
                                   className='border p-2 rounded-xl bg-blue-600 text-white'>+ Add Product</button>
                     </div>
                      {open && <AddCompo onClose={() => setOpen(false)} />}
                     <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-5'>
                            <div className=' flex justify-between items-center p-3 rounded-xl bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Total stock itme</span>
                                          <span className='font-bold'>15</span>
                                   </div>
                                   <div>
                                          <Package size={40} className=' p-1 bg-blue-50 text-blue-700 rounded-lg' />
                                   </div>
                            </div>
                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Low stock itme</span>
                                          <span className='font-bold'>5</span>
                                   </div>
                                   <div>
                                          <AlertCircle size={40} className=' p-1 bg-yellow-100 text-yellow-700 rounded-lg' />
                                   </div>
                            </div>
                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Expired itme</span>
                                          <span className='font-bold'>3</span>
                                   </div>
                                   <div>
                                          <AlertCircle size={40} className=' p-1 bg-red-50 text-red-500 rounded-lg' />
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
                                          <tr className=" text-left bg-gray-100">
                                                 <th className="px-4 py-2">Product Name</th>
                                                 <th className="px-4 py-2">Category</th>
                                                 <th className="px-4 py-2">Batch Number</th>
                                                 <th className="px-4 py-2">Quantity</th>
                                                 <th className="px-4 py-2">MinLevel</th>
                                                 <th className="px-4 py-2">Expiry Date</th>
                                                 <th className="text-start">Status</th>
                                                 <th className="px-4 py-2 text-right">Actions</th>
                                          </tr>
                                   </thead>

                                   <tbody>
                                          {
                                                 mockProducts.map((items) => (
                                                        <tr key={items.id} className="border-t hover:bg-gray-100">
                                                               <td className="px-4 py-2">{items.name}</td>
                                                               <td className="px-4 py-2">{items.category}</td>
                                                               <td className="px-4 py-2">{items.Batch}</td>
                                                               <td className=" px-4 py-2">{items.quantity}</td>
                                                               <td className=" px-4 py-2">{items.MinLevel}</td>
                                                               <td className="px-4 py-2">{items.expiryDate}</td>
                                                               <td className='text-start' >
                                                                      <span className={`text-center text-green-600 font-medium border px-1 py-0.5 text-sm rounded-lg ${items.status === "Low"
                                                                             ? "text-amber-500 bg-amber-100"
                                                                             : items.status === "Out of Stock" || items.status === "Expiring"
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

export default Stoke
