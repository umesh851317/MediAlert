import React from 'react'


function BillPreview({ bill }) {
       const subtotal = bill.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
       const tax = subtotal * 0.05; const total = subtotal + tax;
       return (<div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between border-b pb-4">
                     <div> <h2 className="text-xl font-bold">MediAlert Pharmacy</h2>
                            <p className="text-sm text-gray-500">Smart Inventory System</p>
                     </div>
                     <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{bill.billId}</p>
                            <p className="text-sm text-gray-500"> {bill.date} {bill.time} </p>
                     </div>
              </div> {/* Info */} <div className="flex justify-between">
                     <p>
                            <strong>Customer:</strong> {bill.customerName}
                     </p>
                     <p>

                            <strong>Staff:</strong> {bill.staffName}

                     </p>
              </div> {/* Table */}

              <table className="w-full border"> <thead className="bg-gray-100">
                     <tr>
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2 text-center">Qty</th>
                            <th className="p-2 text-right">Price</th>
                            <th className="p-2 text-right">Total</th>
                     </tr>
              </thead>
                     <tbody>
                            {
                                   bill.items.map((item, i) => (
                                          <tr key={i} className="border-t"> <td className="p-2">{item.name}</td>
                                                 <td className="p-2 text-center">{item.quantity}</td>
                                                 <td className="p-2 text-right">₹{item.price}</td>
                                                 <td className="p-2 text-right"> ₹{(item.price * item.quantity).toFixed(2)}
                                                 </td>
                                          </tr>))}
                     </tbody>
              </table> {/* Summary */}
              <div className="bg-gray-50 p-4 rounded">
                     <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between">
                            <span>GST (18%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between font-bold text-blue-600 text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                     </div>
              </div> {/* Buttons */}
       </div>);
}


export default BillPreview
