import React, { useContext } from 'react';
import { AppContext } from './AppLayout'; // Importar el contexto para el modo oscuro

const AppHeader = ({ currentView, navigate }) => {
  const { darkMode } = useContext(AppContext); // Obtener el estado del modo oscuro

  const titles = {
    home: 'Resumen',
    stats: 'Estadísticas',
    settings: 'Ajustes',
    zenmetas: 'Mis ZenMetas', // Título para la vista de ZenMetas
    auth: 'Bienvenido'
  };

  // Colores del logo según el modo oscuro
  const circleColor = darkMode ? '#2ECC71' : '#2ECC71'; // Verde suave
  const pathColor = darkMode ? '#3498DB' : '#3498DB'; // Azul medio
  const textColor = darkMode ? 'text-white' : 'text-gray-800';

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {/* Logo SaldoZen SVG */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke={circleColor} strokeWidth="2"/>
            <path d="M12 7V17M9 10H15M9 14H15" stroke={pathColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className={`text-2xl font-bold ${textColor}`}>
            {titles[currentView] || 'SaldoZen'}
          </h1>
        </div>
        {currentView !== 'home' && currentView !== 'auth' && ( // No mostrar botón de retorno en auth
          <button 
            onClick={() => navigate('home')}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            aria-label="Volver a Inicio"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;