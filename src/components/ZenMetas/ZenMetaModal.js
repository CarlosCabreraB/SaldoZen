import React, { useState, useEffect } from 'react';

const ZenMetaModal = ({ isOpen, onClose, onSave, zenMetaToEdit = null }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [estimatedDate, setEstimatedDate] = useState('');
  const [icon, setIcon] = useState('✨'); // Icono por defecto
  const [color, setColor] = useState('#3498DB'); // Color por defecto

  const availableIcons = ['✈️', '🚨', '💻', '🏠', '🚗', '🎓', '💍', '👶', '🎁', '🧘‍♀️', '📚', '🚴‍♀️', '💰', '✨'];
  const availableColors = ['#3498DB', '#2ECC71', '#F1C40F', '#E74C3C', '#9B59B6', '#1ABC9C', '#E67E22', '#34495E'];

  useEffect(() => {
    if (zenMetaToEdit) {
      setName(zenMetaToEdit.name);
      setTargetAmount(zenMetaToEdit.targetAmount.toString());
      setEstimatedDate(zenMetaToEdit.estimatedDate);
      setIcon(zenMetaToEdit.icon);
      setColor(zenMetaToEdit.color);
    } else {
      // Resetear campos si no hay meta para editar
      setName('');
      setTargetAmount('');
      setEstimatedDate('');
      setIcon('✨');
      setColor('#3498DB');
    }
  }, [zenMetaToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount || !estimatedDate) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    onSave({
      id: zenMetaToEdit ? zenMetaToEdit.id : null,
      name,
      targetAmount: parseFloat(targetAmount),
      estimatedDate,
      icon,
      color,
      currentAmount: zenMetaToEdit ? zenMetaToEdit.currentAmount : 0, // Mantener el monto actual si es edición
    });
    onClose(); // Cerrar el modal al guardar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {zenMetaToEdit ? 'Editar ZenMeta' : 'Crear Nueva ZenMeta'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Nombre de la Meta</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej. Viaje a Cusco"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Monto Objetivo</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Fecha Estimada</label>
            <input
              type="date"
              value={estimatedDate}
              onChange={(e) => setEstimatedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Ícono</label>
            <div className="flex flex-wrap gap-2">
              {availableIcons.map(i => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  className={`p-2 rounded-lg text-xl ${icon === i ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {availableColors.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-indigo-600' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                ></button>
              ))}
            </div>
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

export default ZenMetaModal;