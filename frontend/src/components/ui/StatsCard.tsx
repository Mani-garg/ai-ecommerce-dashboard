'use client';

import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
}

const StatsCard = ({ title, value }: StatsCardProps) => {
  return (
    <div className="p-5 bg-[#16263b] border border-blue-700 rounded-2xl shadow-md hover:shadow-blue-500/30 transition-shadow duration-300 w-full">
      <h4 className="text-sm text-gray-400 tracking-wide mb-1">{title}</h4>
      <p className="text-3xl font-bold text-blue-400">{value}</p>
    </div>
  );
};

export default StatsCard;
