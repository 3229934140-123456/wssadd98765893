import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { trendData } from '@/data/mockData';

const TrendChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-neutral-100">
          <p className="text-sm font-semibold text-neutral-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-neutral-600">{entry.name}:</span>
              <span className="font-semibold text-neutral-800">
                {entry.value}{entry.name.includes('率') ? '%' : '人'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="content-card">
      <div className="px-6 py-4 border-b border-neutral-100">
        <h3 className="text-base font-semibold text-neutral-800">近4周趋势</h3>
        <p className="text-sm text-neutral-500 mt-0.5">预约量、到诊量与爽约率变化趋势</p>
      </div>
      <div className="p-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="week" 
              stroke="#94a3b8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="#94a3b8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#94a3b8" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#94a3b8' }}
              domain={[0, 20]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-sm text-neutral-600">{value}</span>
              )}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="appointments"
              name="预约数"
              stroke="#0d9488"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="arrivals"
              name="到诊数"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="noShowRate"
              name="爽约率"
              stroke="#f97316"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
