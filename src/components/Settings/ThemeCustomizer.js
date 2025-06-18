import React, { useState } from 'react';
import { HuePicker } from 'react-color';

const ThemeCustomizer = () => {
  const [primaryColor, setPrimaryColor] = useState('#6366F1');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Personalización</h3>
      
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2">Modo Oscuro</span>
        </label>
      </div>
      
      <div>
        <label className="block mb-2">Color Principal</label>
        <HuePicker
          color={primaryColor}
          onChangeComplete={(color) => setPrimaryColor(color.hex)}
          width="100%"
        />
      </div>
    </div>
  );
};

export default ThemeCustomizer;