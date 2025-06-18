import React, { useContext } from 'react';
import { AppContext } from '../Layout/AppLayout';

const AccountSummary = ({ accounts }) => {
  const { selectedCurrency } = useContext(AppContext);

  const formatAmount = (amount) => {
    return `${selectedCurrency.symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Resumen de Cuentas</h3>
      
      <div className="space-y-3">
        {accounts.map(account => (
          <div key={account.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <span className="text-gray-800 dark:text-gray-200 font-medium">{account.name}</span>
            <span className="text-gray-600 dark:text-gray-300">{formatAmount(account.balance)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSummary;

// DONE