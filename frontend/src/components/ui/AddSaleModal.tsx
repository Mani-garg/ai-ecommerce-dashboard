'use client';

import React, { useState } from 'react';

interface AddSaleModalProps {
  onAdd: (newSale: any) => void;
  onClose: () => void;
}

export default function AddSaleModal({ onAdd, onClose }: AddSaleModalProps) {
  const [product, setProduct] = useState('');
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSale = {
      id: '#' + Math.floor(1000 + Math.random() * 9000),
      product,
      customer,
      amount: `₹${amount}`,
      date,
    };

    onAdd(newSale);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e2f48] text-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-blue-700"
      >
        <h3 className="text-xl font-semibold text-blue-300 mb-5">Add New Sale</h3>

        <input
          type="text"
          placeholder="Product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-[#16263b] text-white border border-blue-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Customer"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-[#16263b] text-white border border-blue-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-[#16263b] text-white border border-blue-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Date (e.g. 13 Jul 25)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-6 px-4 py-2 bg-[#16263b] text-white border border-blue-800 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white border border-gray-500 rounded-lg hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
