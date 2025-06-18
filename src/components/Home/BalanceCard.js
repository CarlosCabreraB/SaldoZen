import React, { useContext } from 'react';
import { AppContext } from '../Layout/AppLayout'; // Importar el contexto

const BalanceCard = ({ saldoTotal, saldoDisponible, dineroReservadoZenMetas, income, expenses }) => {
  const { selectedCurrency } = useContext(AppContext);
  const isTotalPositive = saldoTotal >= 0;
  const isAvailablePositive = saldoDisponible >= 0;

  const formatAmount = (amount) => {
    return `${selectedCurrency.symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">Saldo Total (Ingresos - Gastos)</h2>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${isTotalPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isTotalPositive ? 'Positivo' : 'Negativo'}
        </span>
      </div>
      <p className={`text-3xl font-bold mb-4 ${isTotalPositive ? 'text-green-600' : 'text-red-600'}`}>
        {formatAmount(saldoTotal)}
      </p>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Saldo Disponible</h3>
        <p className={`text-2xl font-bold ${isAvailablePositive ? 'text-blue-600' : 'text-red-600'}`}>
          {formatAmount(saldoDisponible)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          (Total - Dinero reservado en ZenMetas)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Ingresos</p>
          <p className="text-green-600 font-medium">+{formatAmount(income)}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Gastos</p>
          <p className="text-red-600 font-medium">-{formatAmount(expenses)}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Reservado</p>
          <p className="text-purple-600 font-medium">{formatAmount(dineroReservadoZenMetas)}</p> {/* Color cambiado a purple-600 */}
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;