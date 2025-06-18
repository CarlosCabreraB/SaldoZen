import React from 'react';

const FinanceHeader = () => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">MoneyTrack</h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Nuevo Movimiento
          </button>
        </div>
      </div>
    </header>
  );
};

export default FinanceHeader;