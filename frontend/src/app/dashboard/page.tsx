'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import StatsCard from '@/components/ui/StatsCard';
import AIInsightCard from '@/components/ui/AIInsightCard';
import { Globe, Sparkle, TrendingUp } from 'lucide-react';

// Dynamically import charts and table to prevent SSR hydration issues
const SalesTrendChart = dynamic(() => import('@/components/ui/SalesTrendChart'), { ssr: false });
const ProductTable = dynamic(() => import('@/components/ui/ProductTable'), { ssr: false });
const CountryBarChart = dynamic(() => import('@/components/ui/CountryBarChart'), { ssr: false });

export default function DashboardPage() {
  const [insights, setInsights] = useState('');
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [metrics, setMetrics] = useState({
    revenue: 'Loading...',
    orders: 'Loading...',
    users: 'Loading...',
  });

  const [salesData, setSalesData] = useState([
    { id: '#1234', product: 'Apple Watch', customer: 'Anjali K.', amount: '₹12000', date: '10 Jul 25' },
    { id: '#1235', product: 'Galaxy Buds', customer: 'Rohan M.', amount: '₹5000', date: '10 Jul 25' },
    { id: '#1236', product: 'MacBook Air', customer: 'Neha P.', amount: '₹90000', date: '09 Jul 25' },
    { id: '#1237', product: 'iPad Mini', customer: 'Amit S.', amount: '₹38000', date: '08 Jul 25' },
    { id: '#1238', product: 'Pixel 7', customer: 'Divya V.', amount: '₹52000', date: '07 Jul 25' },
    { id: '#1239', product: 'AirPods Pro', customer: 'Karan L.', amount: '₹18000', date: '06 Jul 25' },
  ]);

  const [processedSalesData, setProcessedSalesData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch AI Insights
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ai/insights`)
      .then((res) => res.json())
      .then((data) => {
        setInsights(data.insights || 'No insights available.');
        setLoadingInsights(false);
      })
      .catch(() => {
        setInsights('Failed to fetch insights.');
        setLoadingInsights(false);
      });

    // Fetch metrics
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/metrics/summary`)
      .then((res) => res.json())
      .then((data) => setMetrics(data))
      .catch(() => setMetrics({ revenue: 'Error', orders: 'Error', users: 'Error' }));
  }, []);

  useEffect(() => {
    const transformed = salesData.reduce((acc: any[], sale) => {
      const date = sale.date;
      const sales = parseInt(sale.amount.replace(/[^\d]/g, ''), 10);
      const returns = Math.floor(sales * 0.1);
      const profit = Math.floor(sales * 0.6);

      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.sales += sales;
        existing.returns += returns;
        existing.profit += profit;
      } else {
        acc.push({ date, sales, returns, profit });
      }
      return acc;
    }, []);
    setProcessedSalesData(transformed);
  }, [salesData]);

  return (
    <div className="min-h-screen bg-[#0e1a2b] text-white">
      {/* Sticky NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0a1627]/80 border-b border-blue-800 px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-blue-400">InsightForge</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-gray-300">
          {['Dashboard', 'Reports', 'Settings'].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>
        <img
          src="/avatar.png"
          alt="User"
          className="h-9 w-9 rounded-full border border-blue-500 object-cover"
        />
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 space-y-12 overflow-y-auto">
         {/* Section 2: Metrics */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Overview Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard title="Total Revenue" value={metrics.revenue} />
            <StatsCard title="Total Orders" value={metrics.orders} />
            <StatsCard title="Active Users" value={metrics.users} />
          </div>
        </section>
        {/* Section 1: Products + Trends */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Sales & Products</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Table */}
            <div className="bg-[#1c2c40] p-6 rounded-xl shadow-lg border border-blue-800 space-y-4">
              <h3 className="text-lg font-semibold text-blue-300">Product Overview</h3>
              <ProductTable />
            </div>

            {/* Sales Trends */}
            <div className="bg-[#1e2f48] border border-blue-800 p-6 rounded-xl shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-blue-300" />
                <h3 className="text-lg font-semibold text-blue-200">Sales Trends</h3>
              </div>
              {processedSalesData.length > 0 && <SalesTrendChart data={processedSalesData} />}
            </div>
          </div>
        </section>

       

        {/* Section 3: AI & Global */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white">AI & Global Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Predictions */}
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-800/20 border border-blue-700 p-6 rounded-xl shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <Sparkle className="text-blue-300" />
                <h3 className="text-lg font-semibold text-blue-200">AI Predictions</h3>
              </div>
              {loadingInsights ? (
                <p className="text-gray-400">Analyzing market trends...</p>
              ) : (
                <AIInsightCard insights={insights} />
              )}
            </div>

            {/* Global Activity */}
            <div className="bg-[#16263b] border border-blue-700 p-6 rounded-xl shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="text-blue-300" />
                <h3 className="text-lg font-semibold text-blue-200">Global Activity</h3>
              </div>
              <p className="text-gray-300">Top 5 countries by orders this week:</p>
              <ul className="text-sm space-y-2 font-['Segoe_UI_Emoji','sans-serif']">
                {[
                  ['🇮🇳 India', '154'],
                  ['🇺🇸 USA', '79'],
                  ['🇬🇧 UK', '65'],
                  ['🇨🇦 Canada', '42'],
                  ['🇦🇺 Australia', '33'],
                ].map(([country, count]) => (
                  <li key={country} className="flex justify-between border-b border-blue-800 pb-1">
                    <span>{country}</span>
                    <span className="text-white font-semibold">{count} orders</span>
                  </li>
                ))}
              </ul>
              <CountryBarChart />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
