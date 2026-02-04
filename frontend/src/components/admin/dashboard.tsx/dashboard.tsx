"ise client"
import { Key, Package } from 'lucide-react'
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

  return (
    <div className='flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray'>
      <div className=' flex flex-col'>
        <h1 className='text-4xl'>Dashboard</h1>
        <p className='text-sm text-gray-600'>Welcome back! Here's your pharmacy overview</p>
      </div>
      <div className='grid flex-wrap justify-start items-center w-full gap-5 overflow-x grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
        <div className='rounded-2xl h-32 flex justify-between items-center p-5 shrink-0 bg-white shadow-md'>
          <div>
            <p className='text-sm text-gray-600'>Total Product</p>
            <h1 className='text-4xl'>1250</h1>
            <span className='text-green-600 text-sm'>+12% from last month</span>
          </div>
          <div className=''>
            <Package size={40} />
          </div>
        </div>
        <div className='rounded-2xl h-32 flex justify-between items-center p-5 shrink-0 bg-white shadow-md'>
          <div>
            <p className='text-sm text-gray-600'>Total Product</p>
            <h1 className='text-4xl'>1250</h1>
            <span className='text-green-600 text-sm'>+12% from last month</span>
          </div>
          <div className=''>
            <Package size={40} />
          </div>
        </div>
        <div className='rounded-2xl h-32 flex justify-between items-center p-5 shrink-0 bg-white shadow-md'>
          <div>
            <p className='text-sm text-gray-600'>Total Product</p>
            <h1 className='text-4xl'>1250</h1>
            <span className='text-green-600 text-sm'>+12% from last month</span>
          </div>
          <div className=''>
            <Package size={40} />
          </div>
        </div>
        <div className='rounded-2xl h-32 flex justify-between items-center p-5 shrink-0 bg-white shadow-md'>
          <div>
            <p className='text-sm text-gray-600'>Total Product</p>
            <h1 className='text-4xl'>1250</h1>
            <span className='text-green-600 text-sm'>+12% from last month</span>
          </div>
          <div className=''>
            <Package size={40} />
          </div>
        </div>
      </div>
      {/* Recent alert  */}
      <div className=' rounded-2xl bg-white p-4 flex flex-col gap-3 shadow-md'>
        <div>
          <h1 className='text-2xl'>Recent Alerts & Activity</h1>
        </div>
        <div className='flex  flex-col gap-2'>
          {
            recentAlerts.map((items) => (
              <div key={items.id} className='flex justify-between px-5 py-4 items-center rounded-xl bg-gray-50 hover:bg-gray-100'>
                <div className='flex  flex-col gap-0.5'>
                  <h1 className='text-lg font-semibold'>{items.product}</h1>
                  <span className='text-gray-600 text-sm'>Expiry: {items.expiryDate}</span>
                </div>
                <div className={`border rounded-lg px-2 text-sm ${items.status === "Low"
                  ? "text-amber-500 bg-amber-100"
                  : items.status === "Critical" || items.status === "Expiring"
                    ? "text-red-500 bg-red-100"
                    : "text-green-500 bg-green-100"
                  }
                  `}>{items.status}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard
