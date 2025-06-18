import React, { useState, useContext } from 'react';
import { AppContext } from '../Layout/AppLayout'; // Importar el contexto

const SavingsGoalCard = ({ currentSavings, goalAmount, onSetGoal }) => {
  const { selectedCurrency } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(goalAmount);

  const progress = goalAmount > 0 ? (currentSavings / goalAmount) * 100 : 0;
  const progressColor = progress >= 100 ? 'bg-green-500' : progress >= 50 ? 'bg-yellow-500' : 'bg-blue-500';

  const formatAmount = (amount) => {
    return `${selectedCurrency.symbol}${amount.toFixed(2)}`;
  };

  const handleSaveGoal = () => {
    if (newGoal > 0) {
      onSetGoal(newGoal);
      setIsEditing(false);
    } else {
      alert('La meta de ahorro debe ser mayor a cero.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Meta de Ahorro</h2>
        {isEditing ? (
          <button 
            onClick={handleSaveGoal}
            className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
          >
            Guardar
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Editar
          </button>
        )}
      </div>

      {isEditing ? (
        <input
          type="number"
          value={newGoal}
          onChange={(e) => setNewGoal(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Establece tu meta"
        />
      ) : (
        <>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {formatAmount(currentSavings)} / {formatAmount(goalAmount)}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
            <div 
              className={`h-2.5 rounded-full ${progressColor} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
            {progress.toFixed(1)}% completado
          </p>
        </>
      )}
    </div>
  );
};

export default SavingsGoalCard;