import React from 'react'

const SummaryCard = ({ title, value, icon, color }) => {
       const colorMap = {
              blue: "bg-blue-100 text-blue-700",
              green: "bg-green-100 text-green-700",
              red: "bg-red-100 text-red-700",
       };

       return (
              <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
                     <div>
                            <p className="text-gray-600">{title}</p>
                            <p className="text-2xl font-bold">{value}</p>
                     </div>
                     <div className={`p-2 rounded-lg ${colorMap[color]}`}>{icon}</div>
              </div>
       );
};


export default SummaryCard
