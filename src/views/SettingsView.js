import React, { useState } from 'react';
import ThemeSelector from '../components/Settings/ThemeSelector';
import CurrencySelector from '../components/Settings/CurrencySelector';
import SecuritySettings from '../components/Settings/SecuritySettings';
import ExportImport from '../components/Settings/ExportImport';
import CategoryManagementModal from '../components/Settings/CategoryManagementModal';
import AlertSettings from '../components/Settings/AlertSettings'; // Nuevo componente

const SettingsView = ({ navigate, alertThreshold, setAlertThreshold }) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Datos de categorías de ejemplo (simulando un estado global)
  const [categories, setCategories] = useState([
    { id: 'cat1', name: 'Comida' },
    { id: 'cat2', name: 'Transporte' },
    { id: 'cat3', name: 'Ocio' },
  ]);

  const handleAddCategory = (name) => {
    setCategories(prev => [...prev, { id: `cat-${Date.now()}`, name }]);
    alert('Categoría agregada');
  };

  const handleEditCategory = (id, newName) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, name: newName } : cat));
    alert('Categoría actualizada');
  };

  const handleDeleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    alert('Categoría eliminada');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm mb-4">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('home')}
            className="mr-4 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Ajustes</h1>
        </div>
      </header>

      <div className="space-y-6 pb-6">
        {/* 1. Apariencia */}
        <ThemeSelector />
        
        {/* 2. Moneda */}
        <CurrencySelector />
        
        {/* 3. Configuración de AlertaZen */}
        <AlertSettings alertThreshold={alertThreshold} setAlertThreshold={setAlertThreshold} />

        {/* 4. Gestión de Datos (Exportar/Importar) */}
        <ExportImport />

        {/* 5. Seguridad */}
        <SecuritySettings />

        {/* El modal de gestión de categorías se abre desde QuickActions ahora */}
        {isCategoryModalOpen && (
          <CategoryManagementModal
            isOpen={isCategoryModalOpen}
            onClose={() => setIsCategoryModalOpen(false)}
            categories={categories}
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsView;