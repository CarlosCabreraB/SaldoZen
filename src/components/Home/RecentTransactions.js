import React from 'react';
import TransactionItem from './TransactionItem';

const RecentTransactions = ({ transactions, onViewAll, onEditTransaction, onDeleteTransaction }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Transacciones Recientes</h2>
        <button 
          onClick={onViewAll}
          className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          Ver todas →
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <TransactionItem 
            key={transaction.id} 
            transaction={transaction} 
            onEdit={onEditTransaction}
            onDelete={onDeleteTransaction}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;