'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export type BarChartProps = {
  data: {
    date: string;
    amount: number;
  }[];
};

export default function SalesBarChart({ data }: BarChartProps) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-blue-300 mb-4">Sales Overview</h2>
      <div className="bg-[#1e2f48] p-4 rounded-xl border border-blue-800">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="date"
              stroke="#cbd5e1"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#cbd5e1"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #3b82f6',
                borderRadius: '8px',
                color: '#fff',
              }}
              labelStyle={{ color: '#93c5fd' }}
              itemStyle={{ color: '#e0f2fe' }}
            />
            <Bar dataKey="amount" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
