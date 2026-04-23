import {
       LineChart,
       Line,
       XAxis,
       YAxis,
       Tooltip,
       ResponsiveContainer,
       CartesianGrid,
} from "recharts";

const Charts = ({ revenueDatas, data }) => {
       console.log(revenueDatas);

       return (
              <div className="bg-white rounded-xl shadow p-4">
                     <div className="flex justify-between items-center mb-4">
                            <div>
                                   <h2 className="text-xl font-semibold">{data }</h2>
                                   <p className="text-sm text-gray-500">
                                          Performance trends over time
                                   </p>
                            </div>

                            <div className="flex gap-2">
                                   <button className="px-3 py-1 rounded-full bg-gray-200">
                                          Weekly
                                   </button>
                                   <button className="px-3 py-1 rounded-full bg-black text-white">
                                          Monthly
                                   </button>
                            </div>
                     </div>
                     <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                   <LineChart data={revenueDatas}
                                          margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>

                                          <CartesianGrid strokeDasharray="3 3" />

                                          <XAxis dataKey="month"
                                                 angle={-35}
                                                 textAnchor="end"
                                                 interval={1}
                                                 height={70}
                                          />
                                          <YAxis />

                                          <Tooltip />

                                          <Line
                                                 type="monotone"
                                                 dataKey="revenue"
                                                 stroke="#2563eb"
                                                 strokeWidth={3}
                                          />
                                   </LineChart>
                            </ResponsiveContainer>
                     </div>
              </div>
       )
}

export default Charts
