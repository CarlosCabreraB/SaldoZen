import React from 'react';

const MonthlyChart = ({ months, incomeData, expenseData }) => {
  const maxValue = Math.max(...incomeData, ...expenseData) * 1.2; // Escala para que las barras no toquen el techo

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Comparativo Mensual</h3>
      
      <div className="flex items-end space-x-2 h-48">
        {months.map((month, index) => (
          <div key={month} className="flex-1 flex flex-col items-center h-full">
            <div className="w-full flex justify-center space-x-1 h-full">
              {/* Barra de Ingresos */}
              <div 
                className="w-1/2 bg-green-500 rounded-t-sm transition-all duration-300 hover:opacity-80" 
                style={{ height: `${(incomeData[index] / maxValue) * 100}%` }}
                title={`Ingresos: $${incomeData[index].toFixed(2)}`}
              ></div>
              {/* Barra de Gastos */}
              <div 
                className="w-1/2 bg-red-500 rounded-t-sm transition-all duration-300 hover:opacity-80" 
                style={{ height: `${(expenseData[index] / maxValue) * 100}%` }}
                title={`Gastos: $${expenseData[index].toFixed(2)}`}
              ></div>
            </div>
            <span className="text-xs mt-2 text-gray-500 dark:text-gray-400">{month}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Ingresos</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Gastos</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyChart;