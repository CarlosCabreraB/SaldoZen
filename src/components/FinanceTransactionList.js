import React from 'react';

const FinanceTransactionList = () => {
  const transactions = [
    { id: 1, type: 'expense', description: 'Supermercado', amount: 125.50, category: 'Comida', date: '2023-05-15' },
    { id: 2, type: 'income', description: 'Salario', amount: 2500.00, category: 'Ingreso', date: '2023-05-01' },
    { id: 3, type: 'expense', description: 'Gimnasio', amount: 45.00, category: 'Salud', date: '2023-05-10', isRecurrent: true },
    { id: 4, type: 'expense', description: 'Gasolina', amount: 85.00, category: 'Transporte', date: '2023-05-12' }
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Historial de Transacciones</h2>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
              {transaction.isRecurrent && (
                <span className="inline-block mt-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  Recurrente
                </span>
              )}
            </div>
            <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceTransactionList;