import React, { useState, useContext } from 'react';
import { AppContext } from '../Layout/AppLayout'; // Importar el contexto

const CurrencySelector = () => {
  const { selectedCurrency, handleCurrencyChange } = useContext(AppContext);

  // Monedas disponibles (ampliada la lista)
  const currencies = [
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
    { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
    { code: 'JPY', name: 'Yen Japonés', symbol: '¥' },
    { code: 'CAD', name: 'Dólar Canadiense', symbol: 'C$' },
    { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$' },
    { code: 'CHF', name: 'Franco Suizo', symbol: 'CHF' },
    { code: 'CNY', name: 'Yuan Chino', symbol: '¥' },
    { code: 'BRL', name: 'Real Brasileño', symbol: 'R$' },
    { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
    { code: 'CLP', name: 'Peso Chileno', symbol: '$' },
    { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
    { code: 'PEN', name: 'Sol Peruano', symbol: 'S/' },
  ];

  const handleSelectChange = (e) => {
    const newCurrencyCode = e.target.value;
    const newCurrency = currencies.find(c => c.code === newCurrencyCode);
    if (newCurrency) {
      handleCurrencyChange(newCurrency);
      alert(`Moneda cambiada a ${newCurrency.name}.`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Moneda</h3>
      
      <select
        value={selectedCurrency.code}
        onChange={handleSelectChange}
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {currencies.map((currency) => (
          <option 
            key={currency.code} 
            value={currency.code}
            className="bg-white dark:bg-gray-800"
          >
            {currency.name} ({currency.code}) {currency.symbol}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;