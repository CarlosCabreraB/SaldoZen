import React from 'react';

const ExportImport = () => {
  const handleExport = (format) => {
    alert(`Simulando exportación a ${format}. En una aplicación real, esto generaría un archivo.`);
    console.log(`Simulando exportación a ${format}...`);
    // Aquí iría la lógica real para generar y descargar el archivo
  };

  const handleImport = () => {
    alert('Simulando importación desde CSV. En una aplicación real, esto leería un archivo CSV.');
    console.log('Simulando importación desde CSV...');
    // Aquí iría la lógica real para seleccionar y procesar un archivo CSV
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Exportar / Importar Datos</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleExport('PDF')}
          className="py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Exportar PDF
        </button>
        <button 
          onClick={() => handleExport('Excel')}
          className="py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Exportar Excel
        </button>
        <button 
          onClick={() => handleExport('CSV')}
          className="py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Exportar CSV
        </button>
        <button 
          onClick={handleImport}
          className="py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Importar CSV
        </button>
      </div>
    </div>
  );
};

export default ExportImport;

// DONE