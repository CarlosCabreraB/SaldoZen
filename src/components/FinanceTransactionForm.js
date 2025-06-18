import React, { useState } from 'react';

const FinanceTransactionForm = () => {
  const [transaction, setTransaction] = useState({
    type: 'expense',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    isRecurrent: false
  });

  const categories = ['Comida', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Ahorros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', transaction);
    // Lógica para guardar la transacción
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Nueva Transacción</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
        <div className="flex space-x-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTransaction({...transaction, type: 'income'})}
          >
            Ingreso
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${transaction.type === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setTransaction({...transaction, type: 'expense'})}
          >
            Gasto
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={transaction.amount}
          onChange={(e) => setTransaction({...transaction, amount: e.target.value})}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={transaction.date}
          onChange={(e) => setTransaction({...transaction, date: e.target.value})}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={transaction.category}
          onChange={(e) => setTransaction({...transaction, category: e.target.value})}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (opcional)</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={transaction.description}
          onChange={(e) => setTransaction({...transaction, description: e.target.value})}
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="recurrent"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          checked={transaction.isRecurrent}
          onChange={(e) => setTransaction({...transaction, isRecurrent: e.target.checked})}
        />
        <label htmlFor="recurrent" className="ml-2 block text-sm text-gray-700">
          Es una transacción recurrente
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Guardar Transacción
      </button>
    </form>
  );
};

export default FinanceTransactionForm;