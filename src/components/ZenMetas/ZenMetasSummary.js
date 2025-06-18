import React, { useContext } from 'react';
import { AppContext } from '../Layout/AppLayout';

const ZenMetasSummary = ({ zenMetas, onViewAll, onCreateNew }) => {
  const { selectedCurrency } = useContext(AppContext);

  const totalReserved = zenMetas.reduce((sum, meta) => sum + meta.currentAmount, 0);
  const activeMetas = zenMetas.sort((a, b) => (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount)).slice(0, 2);

  const formatAmount = (amount) => {
    return `${selectedCurrency.symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Mis ZenMetas</h2>
        <button 
          onClick={onViewAll}
          className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          Ver todas →
        </button>
      </div>

      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
        Total Reservado: {formatAmount(totalReserved)}
      </p>

      {activeMetas.length > 0 ? (
        <div className="space-y-3">
          {activeMetas.map(meta => {
            const progress = meta.targetAmount > 0 ? (meta.currentAmount / meta.targetAmount) * 100 : 0;
            const progressColor = progress >= 100 ? 'bg-green-500' : 'bg-blue-500';
            return (
              <div key={meta.id} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{meta.icon} {meta.name}</span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">{formatAmount(meta.currentAmount)} / {formatAmount(meta.targetAmount)}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full ${progressColor}`} 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">{progress.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">No tienes ZenMetas aún. ¡Crea una!</p>
      )}

      <button 
        onClick={onCreateNew}
        className="w-full py-2 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Crear nueva ZenMeta
      </button>
    </div>
  );
};

export default ZenMetasSummary;