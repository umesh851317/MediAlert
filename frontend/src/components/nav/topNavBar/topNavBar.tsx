"use client"
import { Bell, Menu, Package, Search, User } from 'lucide-react'
import React, { useState } from 'react'

const TopNavBar = () => {
       const [open, setOpen] = useState(false);

       return (
              <header className=" z-10 px-5 max-lg:px-3 max-md:px-2 flex gap-5 max-md:gap-3 max-sm:gap-1  h-16 items-center justify-between border-b border-gray-200 bg-white">
                     {/* <div className="flex h-16 w-70 border-r items-center justify-center max-sm:justify-start  border-gray-200 px-6"> */}
                     <div className="h-full  shrink flex-1 flex gap-2 items-center justify-start max-md:px-2.5    ">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 max-md:hidden">
                                   <Package className="h-6 w-6 text-white" />
                            </div>
                            <div className='max-md:hidden'>
                                   <h1 className="text-xl font-bold text-gray-900">MediAlert</h1>
                                   <p className="text-xs text-gray-500">Smart Pharmacy</p>
                            </div>
                            <div className='md:hidden'>
                                   <Menu />
                            </div>
                     </div>
                     {/* <div className="flex flex-1 justify-between items-center gap-4"> */}
                     <div className="h-full  flex-5 max-md:flex-7 flex items-center  ">
                            <div className="relative w-full flex justify-center">
                                   <Search className="relative left-7 top-5 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                   <input
                                          type="search"
                                          placeholder="Search products, suppliers..."
                                          className="pl-10 bg-gray-100 border-gray-400 rounded-xl w-full h-10"
                                   />
                            </div>
                     </div>
                     <div className='flex h-full flex-2 max-md:flex-1  items-center justify-end max-md:justify-end gap-5'>
                            {/* <div className=''> */}
                            <div className='flex gap-2 w-2/3 max-lg:w-full  pr-2 items-center justify-evenly '>
                                   <div className='flex '>
                                          <button className="relative rounded-xl">
                                                 <Bell className="h-5 w-5 text-gray-600" />
                                                 <span className="absolute left-4 bottom-3.5 h-2 w-2 rounded-full bg-red-500"></span>
                                          </button>
                                   </div>
                                   <div className="relative ">
                                          {/* Trigger Button */}
                                          <button
                                                 onClick={() => setOpen(!open)}
                                                 className="flex items-center gap-2 rounded-xl  hover:bg-gray-50 transition-colors"
                                          >
                                                 {/* Avatar */}
                                                 <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                                        <User className="h-5 w-5" />
                                                 </div>

                                                 {/* User Info */}
                                                 <div className="text-left hidden md:block">
                                                        <p className="text-lg font-medium text-gray-900">John Doe</p>
                                                        <p className="text-xs text-gray-500">Administrator</p>
                                                 </div>
                                          </button>

                                          {/* Dropdown */}
                                          {open && (
                                                 <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white shadow-lg border z-50">
                                                        <div className="px-4 py-2 text-sm font-medium text-gray-700">
                                                               My Account
                                                        </div>

                                                        <div className="border-t" />

                                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                                                               Profile
                                                        </button>
                                                        <div className="border-t" />

                                                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                                                               Settings
                                                        </button>

                                                        <div className="border-t" />

                                                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                               Log out
                                                        </button>
                                                 </div>
                                          )}
                                   </div>
                            </div>
                     </div>
              </header>
       )
}

export default TopNavBar
