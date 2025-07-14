'use client';

import React from 'react';

interface AIInsightCardProps {
  insights: string;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({ insights }) => {
  return (
    <div className="bg-[#1e2f48] text-white p-5 rounded-2xl border border-blue-700 shadow-md space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-blue-400 text-xl">💡</span>
        <h2 className="text-lg font-semibold text-blue-300">AI Insights</h2>
      </div>
      <ul className="list-disc pl-6 space-y-2 text-gray-300 text-sm">
        {insights
          .split('\n')
          .filter(line => line.trim().length > 0)
          .map((point, i) => (
            <li key={i}>{point}</li>
          ))}
      </ul>
    </div>
  );
};

export default AIInsightCard;
