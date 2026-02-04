import { Edit, Filter, Search, Trash2 } from 'lucide-react'
import React from 'react'

const Product = () => {

  const mockProducts = [
    {
      id: 1,
      name: 'Aspirin 500mg',
      category: 'Pain Relief',
      quantity: 150,
      price: 12.99,
      supplier: 'MedSupply Co.',
      expiryDate: '2026-12-31',
      status: 'OK',
    },
    {
      id: 2,
      name: 'Ibuprofen 200mg',
      category: 'Pain Relief',
      quantity: 45,
      price: 8.99,
      supplier: 'PharmaCorp',
      expiryDate: '2026-03-15',
      status: 'Low',
    },
    {
      id: 3,
      name: 'Vitamin C 1000mg',
      category: 'Vitamins',
      quantity: 0,
      price: 15.49,
      supplier: 'HealthPlus',
      expiryDate: '2027-01-20',
      status: 'Out of Stock',
    },
    {
      id: 4,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      quantity: 220,
      price: 24.99,
      supplier: 'MedSupply Co.',
      expiryDate: '2026-02-10',
      status: 'Expiring',
    },
    {
      id: 5,
      name: 'Paracetamol 1g',
      category: 'Pain Relief',
      quantity: 380,
      price: 6.99,
      supplier: 'PharmaCorp',
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
        <button className='border p-2 rounded-xl bg-blue-600 text-white'>+ Add Product</button>
      </div>
      <div className='flex items-center justify-between h-20 rounded-xl bg-white shadow'>
        <div className="h-full w-1/2 max-md:flex-7 flex items-center  ">
          <div className="relative w-full flex justify-center">
            <Search className="relative left-7 top-5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search products"
              className="pl-10 bg-gray-100 border-gray-400 rounded-xl w-full h-10"
            />
          </div>
        </div>
        <div className='border flex mr-4 px-2.5 rounded-xl items-center'>
          <div><Filter /></div>
          <div className="flex gap-3">
            <select
              className="w-35 px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="pain-relief">Pain Relief</option>
              <option value="antibiotics">Antibiotics</option>
              <option value="vitamins">Vitamins</option>
              <option value="first-aid">First Aid</option>
            </select>
          </div>

        </div>
      </div>
      <div className='w-full h-full bg-white shadow-md  rounded-xl'>
        <div>
          
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className=" text-left">
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Supplier</th>
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
                  <td className="px-4 py-2">{items.quantity}</td>
                  <td className="px-4 py-2">{items.price}</td>
                  <td className="px-4 py-2">{items.supplier}</td>
                  <td className="px-4 py-2">{items.expiryDate}</td>
                  <td className='text-start' >
                    <span className={`text-center text-green-600 font-medium border px-1 py-0.5 text-sm rounded-lg
                    ${items.status === "Low"
                        ? "text-amber-500 bg-amber-100"
                        : items.status === "Out of Stock" || items.status === "Expiring"
                          ? "text-red-500 bg-red-100"
                          : "text-green-500 bg-green-100"
                      }`}>

                      {items.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right flex justify-end gap-5">
                    <button className="text-gray-600 hover:underline">
                      <Edit size={20} />
                    </button>
                    <button className='text-red-500'>
                      <Trash2 size={20} />
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

export default Product
