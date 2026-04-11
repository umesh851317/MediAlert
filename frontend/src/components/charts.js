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
       
       return (
              <div className="bg-white rounded-xl shadow p-4">
                     <h2 className="text-lg font-semibold mb-4">{data}</h2>

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
