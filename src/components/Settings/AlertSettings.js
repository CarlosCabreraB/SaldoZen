import React from 'react';

const AlertSettings = ({ alertThreshold, setAlertThreshold }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Configuración de AlertaZen</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Porcentaje mínimo de saldo disponible: {alertThreshold}%
        </label>
        <input
          type="range"
          min="5"
          max="50"
          step="5"
          value={alertThreshold}
          onChange={(e) => setAlertThreshold(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>5%</span>
          <span>25%</span>
          <span>50%</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Se mostrará una "AlertaZen" cuando tu saldo disponible sea menor al {alertThreshold}% de tu saldo total.
      </p>
    </div>
  );
};

export default AlertSettings;