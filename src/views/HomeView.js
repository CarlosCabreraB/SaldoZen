import React, { useState, useEffect } from 'react';
import BalanceCard from '../components/Home/BalanceCard';
import RecentTransactions from '../components/Home/RecentTransactions';
import QuickActions from '../components/Home/QuickActions';
import TransactionFormModal from '../components/Transactions/TransactionFormModal';
import TransferFormModal from '../components/Transactions/TransferFormModal';
import CategoryManagementModal from '../components/Settings/CategoryManagementModal';
import ZenMetasSummary from '../components/ZenMetas/ZenMetasSummary';
import ZenMetaModal from '../components/ZenMetas/ZenMetaModal';
// import ZenMetasView from '../components/ZenMetas/ZenMetasView'; // Ya no se importa aquí como modal

// Simulación de una base de datos o estado global persistente
const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error("Error parsing stored value:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error storing value:", error);
    }
  }, [key, state]);

  return [state, setState];
};

const HomeView = ({ navigate, zenMetas, transactions, setTransactions, onAddZenMeta, onEditZenMeta, onDeleteZenMeta, onTransferToZenMeta, onWithdrawFromZenMeta, alertThreshold }) => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isZenMetaModalOpen, setIsZenMetaModalOpen] = useState(false); // Estado para el modal de ZenMetas
  const [transactionType, setTransactionType] = useState('expense');
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [zenMetaToEdit, setZenMetaToEdit] = useState(null); // Para edición de ZenMetas

  // Usamos el hook para simular persistencia (para categorías y cuentas)
  const [categories, setCategories] = usePersistentState('appCategories', [
    { id: 'cat1', name: 'Comida' },
    { id: 'cat2', name: 'Transporte' },
    { id: 'cat3', name: 'Ocio' },
    { id: 'cat4', name: 'Salud' },
    { id: 'cat5', name: 'Vivienda' },
    { id: 'cat6', name: 'Ingreso' },
    { id: 'cat7', name: 'Ahorro' },
    { id: 'cat8', name: 'Transferencia' }, // Añadir categoría de transferencia
    { id: 'cat9', name: 'ZenMeta' }, // Nueva categoría para ZenMetas
  ]);

  // Las cuentas ya no se gestionan aquí, solo se inicializan para el modal de transferencia
  // En una app real, estas cuentas se crearían y gestionarían en una sección dedicada.
  const [accounts, setAccounts] = useState([ // Usamos useState normal, no persistente
    { id: 'main', name: 'Cuenta Principal', balance: 5000.00 },
    { id: 'savings', name: 'Ahorros', balance: 2000.00 },
    { id: 'investments', name: 'Inversiones', balance: 10000.00 },
  ]);

  // Calcular el dinero reservado en ZenMetas
  const dineroReservadoZenMetas = zenMetas.reduce((sum, meta) => sum + meta.currentAmount, 0);

  // Calcular saldo total (ingresos - gastos)
  const saldoTotal = transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);

  // Calcular saldo disponible (saldo total - dinero reservado en ZenMetas)
  const saldoDisponible = saldoTotal - dineroReservadoZenMetas;

  const balanceData = {
    total: saldoTotal, // Saldo total de ingresos - gastos
    available: saldoDisponible, // Saldo disponible para gastar
    reserved: dineroReservadoZenMetas, // Dinero reservado en ZenMetas
    income: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    expenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
  };

  // Lógica para la alerta "AlertaZen"
  // La alerta se muestra si el saldo disponible es positivo pero menor al porcentaje del umbral
  const showAlertaZen = saldoDisponible > 0 && saldoDisponible < (saldoTotal * (alertThreshold / 100));


  const handleAddTransaction = (type) => {
    if (type === 'transfer') {
      setIsTransferModalOpen(true);
    } else {
      setTransactionType(type);
      setTransactionToEdit(null);
      setIsTransactionModalOpen(true);
    }
  };

  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction);
    setTransactionType(transaction.type);
    setIsTransactionModalOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    alert('Transacción eliminada');
  };

  const handleSaveTransaction = (transactionData) => {
    // Validar si es un gasto y si el saldo disponible se volverá negativo
    if (transactionData.type === 'expense') {
      const newSaldoDisponible = saldoDisponible - transactionData.amount;
      if (newSaldoDisponible < 0) {
        alert(`AlertaZen: No puedes realizar este gasto. Saldo disponible: $${saldoDisponible.toFixed(2)}`);
        return;
      }
    }

    if (transactionData.id) {
      setTransactions(prev => prev.map(t => t.id === transactionData.id ? { ...transactionData, id: t.id } : t));
      alert('Transacción actualizada');
    } else {
      setTransactions(prev => [...prev, { ...transactionData, id: `temp-${Date.now()}` }]);
      alert('Transacción guardada');
    }
    setIsTransactionModalOpen(false);
  };

  const handleSaveTransfer = (transferData) => {
    const transferAmount = parseFloat(transferData.amount);
    // Validar si la transferencia hará que el saldo disponible sea negativo
    const newSaldoDisponible = saldoDisponible - transferAmount;
    if (newSaldoDisponible < 0) {
      alert(`AlertaZen: No puedes realizar esta transferencia. Saldo disponible: $${saldoDisponible.toFixed(2)}`);
      return;
    }

    const newTransactions = [
      {
        id: `transfer-out-${Date.now()}-1`,
        type: 'expense',
        description: `Transferencia a ${transferData.toAccountName} desde ${transferData.fromAccountName}`,
        amount: transferData.amount,
        category: 'Transferencia',
        date: transferData.date,
      },
    ];
    setTransactions(prev => [...prev, ...newTransactions]);

    alert('Transferencia guardada');
    setIsTransferModalOpen(false);
  };

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
    <div className="space-y-6">
      {/* 1. Saldos */}
      <BalanceCard 
        saldoTotal={saldoTotal} 
        saldoDisponible={saldoDisponible}
        dineroReservadoZenMetas={dineroReservadoZenMetas}
        income={balanceData.income} 
        expenses={balanceData.expenses} 
      />
      
      {showAlertaZen && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.664 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium">¡AlertaZen! Tu saldo disponible es bajo.</p>
          </div>
        </div>
      )}

      {/* 2. Acciones Rápidas */}
      <QuickActions 
        navigate={navigate} 
        onAddTransaction={handleAddTransaction} 
        onManageCategories={() => setIsCategoryModalOpen(true)} 
        onManageAlerts={() => navigate('settings')} // Navega a la vista de ajustes para configurar alertas
      />
      
      {/* 3. Mis ZenMetas */}
      <ZenMetasSummary 
        zenMetas={zenMetas} 
        onViewAll={() => navigate('zenmetas')} 
        onCreateNew={() => { setZenMetaToEdit(null); setIsZenMetaModalOpen(true); }}
      />

      {/* 4. Transacciones Recientes */}
      <RecentTransactions 
        transactions={transactions}
        onViewAll={() => navigate('stats')}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />

      {isTransactionModalOpen && (
        <TransactionFormModal 
          isOpen={isTransactionModalOpen} 
          onClose={() => setIsTransactionModalOpen(false)} 
          onSave={handleSaveTransaction}
          initialType={transactionType}
          transactionToEdit={transactionToEdit}
          categories={categories.map(c => c.name)} 
        />
      )}

      {isTransferModalOpen && (
        <TransferFormModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          onSave={handleSaveTransfer}
          accounts={accounts} 
        />
      )}

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

      {isZenMetaModalOpen && (
        <ZenMetaModal
          isOpen={isZenMetaModalOpen}
          onClose={() => setIsZenMetaModalOpen(false)}
          onSave={zenMetaToEdit ? onEditZenMeta : onAddZenMeta}
          zenMetaToEdit={zenMetaToEdit}
        />
      )}
    </div>
  );
};

export default HomeView;