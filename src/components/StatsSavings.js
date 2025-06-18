import React, { useState } from 'react';

const StatsSavings = () => {
  const [savingsGoal, setSavingsGoal] = useState(5000);
  const [currentSavings, setCurrentSavings] = useState(3200);
  const [showAmounts, setShowAmounts] = useState(true);
  
  const progress = (currentSavings / savingsGoal) * 100;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Meta de Ahorro</h3>
        <button 
          onClick={() => setShowAmounts(!showAmounts)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          {showAmounts ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      
      {showAmounts && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Ahorrado: ${currentSavings}</span>
            <span>Meta: ${savingsGoal}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full bg-green-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right text-xs mt-1">
            {progress.toFixed(1)}% completado
          </div>
        </div>
      )}
      
      <div className="flex space-x-2">
        <input
          type="number"
          value={savingsGoal}
          onChange={(e) => setSavingsGoal(Number(e.target.value))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Nueva meta"
        />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default StatsSavings;