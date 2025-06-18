import React from 'react';

const StatsHeader = ({ onBack }) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <button 
          onClick={onBack}
          className="mr-4 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Estadísticas</h1>
      </div>
    </header>
  );
};

export default StatsHeader;

// DONE