import React from 'react';

const FinanceCategorySummary = () => {
  const categories = [
    { name: 'Comida', amount: 125.50, percentage: 25 },
    { name: 'Transporte', amount: 85.00, percentage: 17 },
    { name: 'Vivienda', amount: 1200.00, percentage: 24 },
    { name: 'Entretenimiento', amount: 65.00, percentage: 13 },
    { name: 'Salud', amount: 45.00, percentage: 9 },
    { name: 'Ahorros', amount: 1000.00, percentage: 20 }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Resumen por Categoría</h2>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {categories.map((category, index) => (
          <div key={index} className="mb-3 last:mb-0">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
              <span className="text-sm font-medium text-gray-700">${category.amount}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${index % 2 === 0 ? 'bg-indigo-600' : 'bg-indigo-400'}`}
                style={{ width: `${category.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceCategorySummary;