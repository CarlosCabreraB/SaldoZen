import React from 'react';

const FinanceCategoryChart = () => {
  const categories = [
    { name: 'Comida', amount: 125.50, color: 'bg-blue-500' },
    { name: 'Transporte', amount: 85.00, color: 'bg-green-500' },
    { name: 'Entretenimiento', amount: 65.00, color: 'bg-yellow-500' },
    { name: 'Salud', amount: 45.00, color: 'bg-red-500' }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Gastos por Categoría</h2>
      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24">
              <p>{category.name}</p>
            </div>
            <div className="flex-1">
              <div className="h-4 rounded-full overflow-hidden bg-gray-200">
                <div 
                  className={`h-full ${category.color}`} 
                  style={{ width: `${(category.amount / 300) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-20 text-right">
              <p>${category.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceCategoryChart;