import { BadgeIndianRupee, Delete, DeleteIcon, Eye, IndianRupee, IndianRupeeIcon, ShoppingCart, Trash2 } from 'lucide-react'
import React from 'react'
type CartProductItem = {
  id: string
  name: string
  batchNo: string
  qty: number
  price: number
  expiryDate: string
}
const Billing = () => {
       const products = [
              { id: '1', name: 'Paracetamol 500mg', batchNo: 'BT001', availableQty: 150, price: 2.5, expiryDate: '2026-12-31' },
              { id: '2', name: 'Ibuprofen 400mg', batchNo: 'BT002', availableQty: 80, price: 3.75, expiryDate: '2026-08-15' },
              { id: '3', name: 'Amoxicillin 250mg', batchNo: 'BT003', availableQty: 45, price: 8.5, expiryDate: '2025-06-30' },
              { id: '4', name: 'Cetirizine 10mg', batchNo: 'BT004', availableQty: 200, price: 1.25, expiryDate: '2027-03-20' },
              { id: '5', name: 'Omeprazole 20mg', batchNo: 'BT005', availableQty: 5, price: 4.0, expiryDate: '2026-11-10' },
              { id: '6', name: 'Aspirin 75mg', batchNo: 'BT006', availableQty: 120, price: 1.5, expiryDate: '2024-01-15' },
       ];
       const CartProduct: CartProductItem[] = [
              // { id: '1', name: 'Paracetamol 500mg', batchNo: 'BT001', qty: 10, price: 2.5, expiryDate: '2026-12-31' },
              // { id: '2', name: 'Aspirin 500mg', batchNo: 'BT011', qty: 50, price: 1.5, expiryDate: '2026-10-31' },

       ]
       const subTotal = CartProduct.reduce(
              (total, item) => total + item.qty * item.price,
              0
       )
       const tax = subTotal * (5/100)
       return (
              <div className='flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray'>
                     <div className='flex flex-col'>
                            <h1 className='text-4xl'>Billing & Orders</h1>
                            <p className='text-sm text-gray-600'>Quick checkout for pharmacy counter operations</p>
                     </div>
                     <div className=' flex py-0.5 gap-4.5 '>
                            <div className=' flex flex-col gap-4.5 w-2/3'>
                                   <div className='p-4 bg-white rounded-xl shadow-lg flex flex-col gap-2'>
                                          <span className='text-2xl'>Product Selection</span>
                                          <input type="text" className='border p-2 rounded-xl'
                                                 placeholder='Search by product name or batch number...' />
                                   </div>
                                   {
                                          CartProduct.length === 0 ? (
                                                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                                        <h2 className="font-semibold text-lg text-gray-900 mb-4">Billing Cart</h2>
                                                        <div className="py-16 text-center">
                                                               <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                      <ShoppingCart className="size-8 text-gray-400" />
                                                               </div>
                                                               <p className="text-gray-500 font-medium">Cart is empty</p>
                                                               <p className="text-sm text-gray-400 mt-1">Search and add products to start billing</p>
                                                        </div>
                                                 </div>
                                          ) : (
                                                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                                                        <h1 className='text-xl px-6 py-4'>Billing Cart ({CartProduct.length} items)</h1>
                                                        <table className="w-full border-collapse overflow-hidden">
                                                               <thead className=''>
                                                                      <tr className="h-15  text-left bg-gray-100 font-light text-gray-500 wrap-break-words">
                                                                             <th className="px-6 py-2 w-40">Product Name</th>
                                                                             <th className="px-4 py-2 w-30">Batch Number</th>
                                                                             <th className="px-4 py-2">Quantity</th>
                                                                             <th className="px-4 py-2">Price</th>
                                                                             <th className="px-4 py-2 w-30">Discount</th>
                                                                             <th className="text-start">Total</th>
                                                                             <th className="px-4 py-2 text-right">Actions</th>
                                                                      </tr>
                                                               </thead>

                                                               <tbody>
                                                                      {
                                                                             CartProduct.map((items: any) => (
                                                                                    <tr key={items.id} className={` h-15 border-t ${items.status === "expired" ? "bg-red-100 hover:bg-red-200" : "bg-white"} items-center`}>
                                                                                           <td className="px-6 py-2 ">{items.name}</td>
                                                                                           <td className="px-4 py-2">{items.batchNo}</td>
                                                                                           <td className="px-4 py-2">{items.qty}</td>
                                                                                           <td className="px-4 py-2">{items.price}</td>
                                                                                           <td className="px-4 py-2">0</td>
                                                                                           <td className="px-4 py-2">{items.qty * items.price}</td>
                                                                                           <td className="px-4 py-2 h-15 text-right flex justify-center gap-5">
                                                                                                  <button className='text-gray-500'>
                                                                                                         <Trash2 size={20} />
                                                                                                  </button>
                                                                                           </td>
                                                                                    </tr>
                                                                             ))
                                                                      }
                                                               </tbody>
                                                        </table>
                                                 </div>
                                          )
                                   }

                            </div>
                            <div className=' w-1/3 flex flex-col gap-4.5'>
                                   <div className='bg-white rounded-xl p-4.5 flex justify-between shadow-md'>
                                          <div className='flex flex-col gap-2'>
                                                 <h1 className='text-lg font-semibold'>Customer Details</h1>
                                                 <p className='text-gray-500 text-sm'>Click to add customer information</p>
                                          </div>
                                          <div>
                                                 <button className={`text-blue-500 font-semibold`}>show</button>
                                          </div>
                                   </div>
                                   <div className='bg-white rounded-xl p-4.5 flex justify-between shadow-md gap-2 flex-col'>
                                          <span className='flex gap-2 items-center'>
                                                 <p><IndianRupee className=' text-blue-600 border-3 rounded-2xl ' /></p>
                                                 <h1 className='text-2xl flex'>Billing Summary</h1>
                                          </span>
                                          <p className='flex justify-between py-2 border-b border-gray-300'>
                                                 <span className='text-gray-500'>Subtotal</span>
                                                 <span className='flex gap-1'><BadgeIndianRupee /> {subTotal}</span>
                                          </p>
                                          <p className='flex justify-between py-2 border-b border-gray-300'>
                                                 <span className='text-gray-500'>Tax(5%)</span>
                                                 <span className='flex gap-1'><BadgeIndianRupee /> {tax}</span>
                                          </p>
                                          <p className='flex justify-between items-center py-4 '>
                                                 <span className='text-black-500 text-lg font-semibold'>Grand Total</span>
                                                 <span className='flex gap-1 text-2xl font-bold text-blue-500'><BadgeIndianRupee size={30} /> {subTotal + tax}</span>
                                          </p>
                                   </div>
                                   <div className='bg-white rounded-2xl shadow-md flex flex-col p-4 gap-1.5'>
                                          <button className='border p-2 rounded-xl bg-blue-700 text-white'>Save</button>
                                          <button className='border p-2 rounded-xl bg-blue-700 text-white'>Save & Print</button>
                                   </div>
                            </div>
                     </div>
              </div>
       )
}

export default Billing
