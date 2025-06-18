import React, { useState } from 'react';

const SecuritySettings = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [discreteMode, setDiscreteMode] = useState(false);

  const handleBiometricToggle = () => {
    setBiometricEnabled(!biometricEnabled);
    alert(`Autenticación biométrica ${biometricEnabled ? 'deshabilitada' : 'habilitada'}. (Funcionalidad no implementada en esta demo)`);
  };

  const handleDiscreteModeToggle = () => {
    setDiscreteMode(!discreteMode);
    alert(`Modo discreto ${discreteMode ? 'desactivado' : 'activado'}. (Funcionalidad no implementada en esta demo)`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Seguridad</h3>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 dark:text-gray-300">Autenticación Biométrica</span>
        <button
          onClick={handleBiometricToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${biometricEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${biometricEnabled ? 'translate-x-6' : 'translate-x-1'}`}
          ></span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-600 dark:text-gray-300">Modo Discreto</span>
        <button
          onClick={handleDiscreteModeToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${discreteMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${discreteMode ? 'translate-x-6' : 'translate-x-1'}`}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;