'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

// Accept genderTrendData as a prop (or put it above this in the same file)
export const GenderTrendChart = ({ data }: { data: any[] }) => {
  return (
    <div className="w-full h-[200px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis dataKey="time" stroke="#555" style={{ fontSize: '12px' }} />

          {/* <YAxis stroke="#ccc" /> */}
          <Tooltip
            contentStyle={{
                backgroundColor: '#222',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
            }}
            />
          {/* <Legend /> */}
          <Line
            type="linear"
            dataKey="Male"
            stroke="#70a3f3"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="linear"
            dataKey="Female"
            stroke="#c951e7"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
