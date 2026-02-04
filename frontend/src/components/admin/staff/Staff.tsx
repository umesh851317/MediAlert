import { Edit, Eye, Filter, Search, Shield, User, UserCheck, UserCog, UserX } from 'lucide-react'
import React from 'react'

const Staff = () => {
       const mockStaffData = [
              {
                     id: '1',
                     name: 'Sarah Johnson',
                     role: 'Admin',
                     email: 'sarah.j@medialert.com',
                     phone: '+1 (555) 123-4567',
                     assignedSection: 'Reports',
                     status: 'Active',
              },
              {
                     id: '2',
                     name: 'Michael Chen',
                     role: 'Staff',
                     email: 'michael.c@medialert.com',
                     phone: '+1 (555) 234-5678',
                     assignedSection: 'Inventory',
                     status: 'Active',
              },
              {
                     id: '3',
                     name: 'Emily Rodriguez',
                     role: 'Admin',
                     email: 'emily.r@medialert.com',
                     phone: '+1 (555) 345-6789',
                     assignedSection: 'Billing',
                     status: 'Inactive',
              },
              {
                     id: '4',
                     name: 'James Wilson',
                     role: 'Staff',
                     email: 'james.w@medialert.com',
                     phone: '+1 (555) 456-7890',
                     assignedSection: 'Store',
                     status: 'Active',
              },
              {
                     id: '5',
                     name: 'Lisa Anderson',
                     role: 'Staff',
                     email: 'lisa.a@medialert.com',
                     phone: '+1 (555) 567-8901',
                     assignedSection: 'Billing',
                     status: 'Inactive',
              },
              {
                     id: '6',
                     name: 'David Martinez',
                     role: 'Staff',
                     email: 'david.m@medialert.com',
                     phone: '+1 (555) 678-9012',
                     assignedSection: 'Inventory',
                     status: 'Active',
              },
       ];
       return (
              <div className='flex flex-col p-6 max-sm:p-4 gap-4 w-full bg-gray'>
                     <div className=' flex justify-between items-center'>
                            <div className='flex flex-col'>
                                   <h1 className='text-4xl'>i</h1>
                                   <p className='text-sm text-gray-600'>Manage your pharmacy inventory</p>
                            </div>
                            <button
                                   //   onClick={() => setOpen(true)}
                                   className='border p-2 rounded-xl bg-blue-600 text-white'>+ Add i
                            </button>
                     </div>
                     <div className='grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5'>
                            <div className=' flex justify-between items-center p-3 rounded-xl bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Total Staff</span>
                                          <span className='font-bold'>5</span>
                                   </div>
                                   <div>
                                          <User size={40} className=' p-1 bg-blue-50 text-blue-700 rounded-lg' />
                                   </div>
                            </div>
                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Active staff</span>
                                          <span className='font-bold'>2</span>
                                   </div>
                                   <div>
                                          <UserCheck size={40} className=' p-1 bg-green-200 text-green-900 rounded-lg' />
                                   </div>
                            </div>
                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Admin User</span>
                                          <span className='font-bold'>3</span>
                                   </div>
                                   <div>
                                          <Shield size={40} className=' p-1 bg-red-50 text-red-500 rounded-lg' />
                                   </div>
                            </div>
                            <div className=' flex justify-between items-center p-3 rounded-xl  bg-white shadow hover:shadow-2xl'>
                                   <div className='flex flex-col text-xl'>
                                          <span className='text-gray-600'>Staff User</span>
                                          <span className='font-bold'>3</span>
                                   </div>
                                   <div>
                                          <UserCog size={40} className=' p-1 bg-red-50 text-red-500 rounded-lg' />
                                   </div>
                            </div>

                     </div>
                     <div className="  p-3 rounded-xl bg-white shadow flex flex-col lg:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                   <input
                                          type="text"
                                          placeholder="Search by name or email..."
                                          // value={searchQuery}
                                          // onChange={(e) => setSearchQuery(e.target.value)}
                                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   />
                            </div>

                            {/* Role Filter */}
                            <div className="flex items-center space-x-2">
                                   <Filter className="w-5 h-5 text-gray-400" />
                                   <select
                                          // value={roleFilter}
                                          // onChange={(e) => setRoleFilter(e.target.value as any)}
                                          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   >
                                          <option value="All">All Roles</option>
                                          <option value="Admin">Admin</option>
                                          <option value="Staff">Staff</option>
                                   </select>
                                   <select
                                          // value={statusFilter}
                                          // onChange={(e) => setStatusFilter(e.target.value as any)}
                                          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   >
                                          <option value="All">All Status</option>
                                          <option value="Active">Active</option>
                                          <option value="Inactive">Inactive</option>
                                   </select>
                            </div>
                     </div>
                     <div className='w-full h-full bg-white shadow-md rounded-xl overflow-scroll no-scrollbar-x'>
                            <table className="w-full">
                                   <thead className="bg-gray-50 border-b border-gray-200">
                                          <tr>
                                                 <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                        Staff Name
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                        Role
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                        Email
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                        Contact
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider w-30">
                                                        Assigned Section
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                        Status
                                                 </th>
                                                 <th className="text-left px-6 py-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                        Action
                                                 </th>
                                          </tr>
                                   </thead>
                                   <tbody className="divide-y divide-gray-200">
                                          {mockStaffData.map((i) => (
                                                 <tr
                                                        key={i.id} className={`hover:bg-gray-50 transition-colors `}>
                                                        <td className="px-6 py-4">
                                                               <span className="font-semibold text-gray-900">{i.name}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                               <span className={`px-3 py-1 ${i.role == 'Admin' ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}  rounded-lg text-sm font-medium 
                                                                      `}>
                                                                      {i.role}
                                                               </span>

                                                        </td>
                                                        <td className="px-6 py-4">
                                                               <span className="font-medium text-sm text-gray-600">
                                                                      {i.email}
                                                               </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                               {i.phone}

                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-600">
                                                               <span className="text-gray-600">{i.assignedSection}</span>
                                                        </td>
                                                        <td className={`px-6 py-4 `}>
                                                               <span className={`px-3 py-1 ${i.status == 'Active' ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}  rounded-lg text-sm font-medium 
                                                                      `}>
                                                                      {i.status}
                                                               </span>
                                                        </td>
                                                        <td className={`px-6 py-4 `}>
                                                               <span className='flex gap-4 '>
                                                                      <button><Eye size={18} className='text-gray-500'/></button>
                                                                      <button><Edit size={18} className='text-blue-600' /></button>
                                                                      <button>
                                                                             {
                                                                             i.status == "Inactive" ? (<UserCheck size={18} className='text-green-500' />) : (<UserX size={18} className='text-red-500'/>)
                                                                      }
                                                                      </button>
                                                               </span>
                                                        </td>
                                                 </tr>
                                          ))}
                                   </tbody>
                            </table>

                     </div>
              </div>
       )
}

export default Staff
