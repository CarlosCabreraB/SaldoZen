import React, { useState } from 'react';

const ThemeSelector = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    // Aquí iría la lógica para cambiar el tema global de la app
    alert(`Modo oscuro ${darkMode ? 'desactivado' : 'activado'}. (Funcionalidad no implementada en esta demo)`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Apariencia</h3>
      
      <div className="flex items-center justify-between">
        <span className="text-gray-600 dark:text-gray-300">Modo Oscuro</span>
        <button
          onClick={handleThemeToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default ThemeSelector;