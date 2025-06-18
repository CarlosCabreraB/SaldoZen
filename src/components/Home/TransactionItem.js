import React from 'react';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const isExpense = transaction.type === 'expense';
  const isTransfer = transaction.category === 'Transferencia';
  const isZenMeta = transaction.category === 'ZenMeta'; // Identificar transacciones de ZenMeta

  const categoryIcons = {
    'Comida': '🍔',
    'Ingreso': '💰', 
    'Movilidad': '🚗',
    'Vivienda': '🏠',
    'Ocio': '🎉',
    'Salud': '🏥',
    'Ahorro': '🏦',
    'Educación': '📚',
    'Servicios': '💡',
    'Transferencia': '↔️',
    'ZenMeta': '🧘‍♀️' // Ícono para ZenMetas
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 group">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${isExpense && !isTransfer && !isZenMeta ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'}`}>
          {categoryIcons[transaction.category] || '📊'}
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-100">{transaction.description || transaction.category}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <p className={`font-medium ${isExpense && !isTransfer && !isZenMeta ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
          {isExpense && !isTransfer ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
        </p>
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            onClick={() => onEdit(transaction)}
            className="p-1 text-blue-500 hover:text-blue-700"
            title="Editar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(transaction.id)}
            className="p-1 text-red-500 hover:text-red-700"
            title="Eliminar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;