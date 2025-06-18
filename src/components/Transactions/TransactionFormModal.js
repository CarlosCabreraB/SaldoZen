import React, { useState, useEffect } from 'react';

const TransactionFormModal = ({ isOpen, onClose, onSave, initialType = 'expense', transactionToEdit = null, categories }) => {
  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurrent, setIsRecurrent] = useState(false);

  // Filtrar categorías para que no aparezcan "Transferencia" o "ZenMeta" en transacciones normales
  const filteredCategories = categories.filter(cat => cat !== 'Transferencia' && cat !== 'ZenMeta');

  useEffect(() => {
    if (transactionToEdit) {
      setType(transactionToEdit.type);
      setAmount(transactionToEdit.amount.toString());
      setDate(transactionToEdit.date.split('T')[0]); // Asume formato ISO
      setCategory(transactionToEdit.category);
      setDescription(transactionToEdit.description || '');
      setIsRecurrent(transactionToEdit.isRecurrent || false);
    } else {
      // Resetear campos si no hay transacción para editar
      setType(initialType);
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategory(filteredCategories.length > 0 ? filteredCategories[0] : ''); // Seleccionar la primera categoría filtrada
      setDescription('');
      setIsRecurrent(false);
    }
  }, [transactionToEdit, initialType, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    onSave({
      id: transactionToEdit ? transactionToEdit.id : null, // Pasa el ID si es edición
      type,
      amount: parseFloat(amount),
      date,
      category,
      description,
      isRecurrent,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {transactionToEdit ? 'Editar Transacción' : (initialType === 'expense' ? 'Nuevo Gasto' : 'Nuevo Ingreso')}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Tipo</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`flex-1 py-2 rounded-lg transition-colors ${type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                Gasto
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`flex-1 py-2 rounded-lg transition-colors ${type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                Ingreso
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Monto</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Selecciona una categoría</option>
              {filteredCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Descripción (opcional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej. Café con amigos"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              checked={isRecurrent}
              onChange={(e) => setIsRecurrent(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 block text-gray-700 dark:text-gray-300 text-sm">Transacción Recurrente</label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionFormModal;

// DONE