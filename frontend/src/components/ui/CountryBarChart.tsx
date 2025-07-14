// src/components/ui/CountryBarChart.tsx
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

const data = [
  { country: 'India 🇮🇳', orders: 154 },
  { country: 'USA 🇺🇸', orders: 79 },
  { country: 'UK 🇬🇧', orders: 65 },
  { country: 'Canada 🇨🇦', orders: 42 },
  { country: 'Australia 🇦🇺', orders: 33 },
];

export default function CountryBarChart() {
  return (
    <div className="mt-6">
      <h3 className="text-blue-300 text-sm font-semibold mb-2">Country-wise Orders</h3>
      <div className="bg-[#1e2f48] p-4 rounded-xl border border-blue-800">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="country" stroke="#cbd5e1" tick={{ fontSize: 11 }} />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6', color: '#fff' }}
              labelStyle={{ color: '#93c5fd' }}
              itemStyle={{ color: '#e0f2fe' }}
            />
            <Bar dataKey="orders" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
