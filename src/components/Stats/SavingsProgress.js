import React from 'react';

const SavingsProgress = ({ currentSavings, goalAmount }) => {
  // Asegurarse de que goalAmount sea un número y no sea cero para evitar división por cero
  const safeGoalAmount = goalAmount > 0 ? goalAmount : 1; 
  const percentage = (currentSavings / safeGoalAmount) * 100;
  const progressColor = percentage >= 100 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Meta de Ahorro</h3>
      
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm text-gray-600 dark:text-gray-300">Ahorrado: ${currentSavings.toFixed(2)}</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">Meta: ${goalAmount.toFixed(2)}</span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
        <div 
          className={`h-2.5 rounded-full ${progressColor} transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }} 
        ></div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">0%</span>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
          {percentage.toFixed(1)}% completado
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">100%</span>
      </div>
    </div>
  );
};

export default SavingsProgress;

// DONE