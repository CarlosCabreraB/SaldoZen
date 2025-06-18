import React, { useState, useEffect } from 'react';
import AppHeader from './AppHeader';
import BottomNavigation from './BottomNavigation';

// Simulación de un contexto global para la moneda y el tema
export const AppContext = React.createContext();

const AppLayout = ({ children, currentView, navigate }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    try {
      const storedCurrency = localStorage.getItem('appCurrency');
      return storedCurrency ? JSON.parse(storedCurrency) : { code: 'MXN', name: 'Peso Mexicano', symbol: '$' };
    } catch (error) {
      console.error("Error parsing stored currency:", error);
      return { code: 'MXN', name: 'Peso Mexicano', symbol: '$' };
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const storedMode = localStorage.getItem('appDarkMode');
      return storedMode ? JSON.parse(storedMode) : false;
    } catch (error) {
      console.error("Error parsing stored dark mode:", error);
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('appCurrency', JSON.stringify(selectedCurrency));
    } catch (error) {
      console.error("Error storing currency:", error);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    try {
      localStorage.setItem('appDarkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error("Error storing dark mode:", error);
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleThemeToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <AppContext.Provider value={{ selectedCurrency, handleCurrencyChange, darkMode, handleThemeToggle }}>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <AppHeader currentView={currentView} navigate={navigate} />
        
        <main className="flex-1 container mx-auto px-4 py-6 pb-20">
          {children}
        </main>
        
        <BottomNavigation currentView={currentView} navigate={navigate} />
      </div>
    </AppContext.Provider>
  );
};

export default AppLayout;