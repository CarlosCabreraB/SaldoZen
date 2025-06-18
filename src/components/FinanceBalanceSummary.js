import React from 'react';

const FinanceBalanceSummary = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-sm text-gray-500">Balance Total</p>
        <p className="text-xl font-bold text-gray-800">$8,450.50</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-sm text-gray-500">Ingresos</p>
        <p className="text-xl font-bold text-green-600">$12,000.00</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <p className="text-sm text-gray-500">Gastos</p>
        <p className="text-xl font-bold text-red-600">$3,549.50</p>
      </div>
    </div>
  );
};

export default FinanceBalanceSummary;