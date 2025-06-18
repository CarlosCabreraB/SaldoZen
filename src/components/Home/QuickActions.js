import React from 'react';

const QuickActions = ({ navigate, onAddTransaction, onManageCategories, onManageAlerts }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Acciones Rápidas</h3>
      
      <div className="grid grid-cols-5 gap-2"> {/* Cambiado a 5 columnas */}
        <button 
          onClick={onManageCategories} // Botón para gestionar categorías
          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">Categorías</span>
        </button>

        <button 
          onClick={() => onAddTransaction('income')}
          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">Ingreso</span>
        </button>
        
        <button 
          onClick={() => onAddTransaction('expense')}
          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">Gasto</span>
        </button>
        
        <button 
          onClick={() => navigate('zenmetas')} // Botón para ZenMetas
          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM12 18c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM12 2c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM4 10c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM20 10c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
            </svg>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">ZenMetas</span>
        </button>

        <button 
          onClick={onManageAlerts} // Botón para configurar alertas
          className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-300">Alertas</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;