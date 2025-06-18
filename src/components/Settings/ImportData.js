import React, { useRef } from 'react';

const ImportData = () => {
  const fileInputRef = useRef(null);

  const handleImport = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      // Lógica para importar datos
      console.log('Importing file:', file.name);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Importar Datos</h3>
      
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        className="hidden"
        onChange={handleImport}
      />
      
      <button
        onClick={() => fileInputRef.current.click()}
        className="w-full py-2 bg-indigo-600 text-white rounded-lg"
      >
        Seleccionar Archivo CSV
      </button>
    </div>
  );
};

export default ImportData;