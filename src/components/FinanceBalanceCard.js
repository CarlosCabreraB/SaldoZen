import React from 'react';

const FinanceBalanceCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
      <h2 className="text-lg font-medium mb-2">Balance Total</h2>
      <p className="text-3xl font-bold">$12,345.67</p>
      <div className="flex justify-between mt-4 text-sm">
        <div>
          <p>Ingresos</p>
          <p className="font-medium">$15,200.00</p>
        </div>
        <div>
          <p>Gastos</p>
          <p className="font-medium">$2,854.33</p>
        </div>
      </div>
    </div>
  );
};

export default FinanceBalanceCard;