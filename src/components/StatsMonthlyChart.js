import React from 'react';

const StatsMonthlyChart = () => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const incomeData = [2500, 2800, 3000, 2700, 3200, 2900];
  const expenseData = [1800, 2000, 2200, 2100, 2300, 2400];

  const maxValue = Math.max(...incomeData, ...expenseData) * 1.2;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Comparativo Mensual</h3>
      <div className="flex items-end space-x-2 h-48">
        {months.map((month, index) => (
          <div key={month} className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-center space-x-1">
              <div 
                className="w-1/2 bg-green-500 rounded-t-sm" 
                style={{ height: `${(incomeData[index] / maxValue) * 100}%` }}
              ></div>
              <div 
                className="w-1/2 bg-red-500 rounded-t-sm" 
                style={{ height: `${(expenseData[index] / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs mt-2">{month}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span className="text-sm">Ingresos</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span className="text-sm">Gastos</span>
        </div>
      </div>
    </div>
  );
};

export default StatsMonthlyChart;