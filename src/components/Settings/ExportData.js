import React from 'react';

const ExportData = () => {
  const handleExport = (format) => {
    // Lógica para exportar datos
    console.log(`Exporting data as ${format}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Exportar Datos</h3>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => handleExport('PDF')}
          className="flex-1 py-2 bg-red-600 text-white rounded-lg"
        >
          PDF
        </button>
        <button 
          onClick={() => handleExport('Excel')}
          className="flex-1 py-2 bg-green-600 text-white rounded-lg"
        >
          Excel
        </button>
        <button 
          onClick={() => handleExport('CSV')}
          className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
        >
          CSV
        </button>
      </div>
    </div>
  );
};

export default ExportData;