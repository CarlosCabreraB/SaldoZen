import React from 'react';

const StatsHeader = ({ activeView, setActiveView }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h2 className="text-xl font-semibold mb-4">Estadísticas Detalladas</h2>
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded-lg ${activeView === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveView('monthly')}
        >
          Mensual
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeView === 'categories' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveView('categories')}
        >
          Categorías
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeView === 'calendar' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveView('calendar')}
        >
          Calendario
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeView === 'savings' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          onClick={() => setActiveView('savings')}
        >
          Ahorros
        </button>
      </div>
    </div>
  );
};

export default StatsHeader;