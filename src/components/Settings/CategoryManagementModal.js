import React, { useState } from 'react';

const CategoryManagementModal = ({ isOpen, onClose, categories, onAddCategory, onEditCategory, onDeleteCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null); // { id, name }

  const handleAddOrUpdateCategory = () => {
    if (!newCategoryName.trim()) {
      alert('El nombre de la categoría no puede estar vacío.');
      return;
    }

    if (editingCategory) {
      onEditCategory(editingCategory.id, newCategoryName);
      setEditingCategory(null);
    } else {
      onAddCategory(newCategoryName);
    }
    setNewCategoryName('');
  };

  const startEditing = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Gestionar Categorías</h2>
        
        <div className="mb-4 flex space-x-2">
          <input
            type="text"
            placeholder={editingCategory ? "Editar nombre de categoría" : "Nueva categoría"}
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddOrUpdateCategory}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {editingCategory ? 'Guardar' : 'Agregar'}
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
          {categories.length === 0 ? (
            <p className="p-4 text-gray-500 dark:text-gray-400 text-center">No hay categorías.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories.map((cat) => (
                <li key={cat.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <span className="text-gray-800 dark:text-gray-200">{cat.name}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => startEditing(cat)}
                      className="p-1 text-blue-500 hover:text-blue-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => onDeleteCategory(cat.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementModal;