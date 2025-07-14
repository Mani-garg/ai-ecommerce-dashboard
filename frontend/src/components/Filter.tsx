'use client';

import React from 'react';

interface FilterProps {
  filter: string;
  setFilter: (val: string) => void;
}

export default function Filter({ filter, setFilter }: FilterProps) {
  return (
    <div className="flex justify-end mb-4">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search customer..."
        className="px-4 py-2 bg-[#16263b] text-white border border-blue-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
