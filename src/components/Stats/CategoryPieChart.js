import React from 'react';

const CategoryPieChart = ({ categories }) => {
  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
  
  // Colores para las secciones del pastel
  const colors = ['#3498DB', '#2ECC71', '#F1C40F', '#E74C3C', '#9B59B6', '#1ABC9C', '#E67E22'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Gastos por Categoría</h3>
      
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-40 h-40 relative mb-4 md:mb-0">
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
                  background: `conic-gradient(from ${rotation}deg, ${colors[index % colors.length]} 0 ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg 360deg)`,
                  clipPath: 'circle(50% at 50% 50%)'
                }}
              ></div>
            );
          })}
        </div>
        
        <div className="md:ml-6 grid grid-cols-2 gap-2 w-full md:w-auto">
          {categories.map((category, index) => (
            <div key={category.name} className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: colors[index % colors.length] }}></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{category.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ${category.amount.toFixed(2)} ({(category.amount / total * 100).toFixed(1)}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;