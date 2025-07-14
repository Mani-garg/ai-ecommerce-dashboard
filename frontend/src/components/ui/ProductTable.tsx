'use client';

import React, { useState } from 'react';
import Filter from '../Filter';
import Pagination from './Pagination';
import { parse } from 'json2csv';
import { Trash2 } from 'lucide-react';
import AddSaleModal from './AddSaleModal';
import SalesBarChart from './BarChart';

const initialSalesData = [
  { id: '#1234', product: 'Apple Watch', customer: 'Anjali K.', amount: '₹12,000', date: '10 Jul 25' },
  { id: '#1235', product: 'Galaxy Buds', customer: 'Rohan M.', amount: '₹5,000', date: '10 Jul 25' },
  { id: '#1236', product: 'MacBook Air', customer: 'Neha P.', amount: '₹90,000', date: '09 Jul 25' },
  { id: '#1237', product: 'iPad Mini', customer: 'Amit S.', amount: '₹38,000', date: '08 Jul 25' },
  { id: '#1238', product: 'Pixel 7', customer: 'Divya V.', amount: '₹52,000', date: '07 Jul 25' },
  { id: '#1239', product: 'AirPods Pro', customer: 'Karan L.', amount: '₹18,000', date: '06 Jul 25' }
];

const ITEMS_PER_PAGE = 3;


export default function ProductTable() {
  const [salesData, setSalesData] = useState(initialSalesData);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const filteredData = salesData.filter((item) =>
    item.customer.toLowerCase().includes(filter.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handleDelete = (id: string) => {
    setSalesData(prev => prev.filter(item => item.id !== id));
  };

  const handleExport = () => {
    const csv = parse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sales_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdd = (newSale: any) => {
    setSalesData(prev => [...prev, newSale]);
  };

  return (
    <div className="p-6 bg-[#16263b] text-white rounded-2xl shadow-md border border-blue-700 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-300">Recent Sales</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Sale
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Export CSV
          </button>
        </div>
      </div>

      <Filter filter={filter} setFilter={setFilter} />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-[#1c2c40] text-blue-200">
            <tr>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((sale, idx) => (
              <tr
                key={idx}
                className="border-b border-blue-800 hover:bg-blue-950/20 transition"
              >
                <td className="py-2 px-4">{sale.id}</td>
                <td className="py-2 px-4">{sale.product}</td>
                <td className="py-2 px-4">{sale.customer}</td>
                <td className="py-2 px-4">{sale.amount}</td>
                <td className="py-2 px-4">{sale.date}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(sale.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {showModal && (
        <AddSaleModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
