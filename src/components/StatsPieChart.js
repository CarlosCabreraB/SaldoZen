import React from 'react';

const StatsPieChart = () => {
  const categories = [
    { name: 'Comida', amount: 1250, color: 'bg-blue-500' },
    { name: 'Transporte', amount: 850, color: 'bg-green-500' },
    { name: 'Vivienda', amount: 1200, color: 'bg-yellow-500' },
    { name: 'Ocio', amount: 650, color: 'bg-red-500' },
    { name: 'Salud', amount: 450, color: 'bg-purple-500' }
  ];

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Gastos por Categoría</h3>
      <div className="flex items-center">
        <div className="w-40 h-40 relative">
          {categories.map((category, index) => {
            const percentage = (category.amount / total) * 100;
            const rotation = categories.slice(0, index).reduce((sum, cat) => {
              return sum + (cat.amount / total) * 360;
            }, 0);
            
            return (
              <div
                key={category.name}
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from ${rotation}deg, ${category.color} 0 ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg 360deg)`,
                  clipPath: 'circle(50% at 50% 50%)'
                }}
              ></div>
            );
          })}
        </div>
        <div className="ml-6">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center mb-2">
              <div className={`w-3 h-3 ${category.color} rounded-full mr-2`}></div>
              <span className="text-sm">
                {category.name}: {((category.amount / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPieChart;