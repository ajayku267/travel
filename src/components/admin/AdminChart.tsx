"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  date: string;
  bookings: number;
  inquiries: number;
}

export default function AdminChart({ data }: { data: ChartData[] }) {
  if (!data || data.length === 0) {
    return <div className="text-sm text-gray-500">No data available yet.</div>;
  }

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: "#6b7280" }} 
            axisLine={false} 
            tickLine={false} 
            dy={10}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#6b7280" }} 
            axisLine={false} 
            tickLine={false} 
            dx={-10}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area
            type="monotone"
            dataKey="bookings"
            name="Bookings"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBookings)"
          />
          <Area
            type="monotone"
            dataKey="inquiries"
            name="Inquiries"
            stroke="#eab308"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorInquiries)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
