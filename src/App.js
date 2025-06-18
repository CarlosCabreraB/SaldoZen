import React, { useState, useEffect } from 'react';
import AppLayout from './components/Layout/AppLayout'; // Ruta corregida
import HomeView from './views/HomeView';
import StatsView from './views/StatsView';
import SettingsView from './views/SettingsView';
import AuthScreen from './views/AuthScreen';
import ZenMetasView from './components/ZenMetas/ZenMetasView'; // Importar la vista de ZenMetas

// Simulación de una base de datos o estado global persistente
const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      // Asegurarse de que el valor por defecto sea un array vacío si no hay nada guardado
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error parsing stored value for key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error storing value for key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};

const App = () => {
  const [currentView, setCurrentView] = useState('auth');
  const [authenticated, setAuthenticated] = useState(false);

  // Estados globales para ZenMetas y Transacciones
  const [zenMetas, setZenMetas] = usePersistentState('appZenMetas', [
    { id: 'zm1', name: 'Viaje a Cusco', targetAmount: 1500, currentAmount: 300, estimatedDate: '2024-12-31', icon: '✈️', color: '#3498DB' },
    { id: 'zm2', name: 'Fondo de Emergencia', targetAmount: 5000, currentAmount: 1200, estimatedDate: '2025-06-30', icon: '🚨', color: '#E74C3C' },
  ]);

  const [transactions, setTransactions] = usePersistentState('appTransactions', [
    { id: '1', type: 'expense', description: 'Supermercado', amount: 125.50, category: 'Comida', date: '2023-05-15T00:00:00.000Z' },
    { id: '2', type: 'income', description: 'Salario', amount: 2500.00, category: 'Ingreso', date: '2023-05-01T00:00:00.000Z' },
    { id: '3', type: 'expense', description: 'Transporte', amount: 85.00, category: 'Transporte', date: '2023-05-10T00:00:00.000Z' },
    { id: '4', type: 'expense', description: 'Cine', amount: 50.00, category: 'Ocio', date: '2023-05-12T00:00:00.000Z' },
    { id: '5', type: 'income', description: 'Venta extra', amount: 300.00, category: 'Ingreso', date: '2023-05-20T00:00:00.000Z' },
    { id: '6', type: 'expense', description: 'Restaurante', amount: 70.00, category: 'Comida', date: '2023-06-01T00:00:00.000Z' },
    { id: '7', type: 'expense', description: 'Gasolina', amount: 60.00, category: 'Transporte', date: '2023-06-05T00:00:00.000Z' },
    { id: '8', type: 'income', description: 'Freelance', amount: 800.00, category: 'Ingreso', date: '2023-06-10T00:00:00.000Z' },
  ]);

  // Nuevo estado persistente para el umbral de alerta
  const [alertThreshold, setAlertThreshold] = usePersistentState('appAlertThreshold', 30); // Porcentaje por defecto

  // Funciones de gestión de ZenMetas
  const handleAddZenMeta = (metaData) => {
    setZenMetas(prev => [...prev, { ...metaData, id: `zm-${Date.now()}`, currentAmount: 0 }]);
    alert('ZenMeta creada');
  };

  const handleEditZenMeta = (metaData) => {
    setZenMetas(prev => prev.map(meta => meta.id === metaData.id ? { ...metaData, id: meta.id } : meta));
    alert('ZenMeta actualizada');
  };

  const handleDeleteZenMeta = (id) => {
    const metaToDelete = zenMetas.find(meta => meta.id === id);
    if (metaToDelete && metaToDelete.currentAmount > 0) {
      setTransactions(prev => [...prev, {
        id: `withdrawal-zm-${Date.now()}`,
        type: 'income',
        description: `Retiro por eliminación de ZenMeta: ${metaToDelete.name}`,
        amount: metaToDelete.currentAmount,
        category: 'ZenMeta',
        date: new Date().toISOString().split('T')[0],
      }]);
    }
    setZenMetas(prev => prev.filter(meta => meta.id !== id));
    alert('ZenMeta eliminada');
  };

  const handleTransferToZenMeta = (metaId, amount) => {
    const transferAmount = parseFloat(amount);
    const dineroReservadoZenMetas = zenMetas.reduce((sum, meta) => sum + meta.currentAmount, 0);
    const saldoTotal = transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);
    const saldoDisponible = saldoTotal - dineroReservadoZenMetas;

    if (saldoDisponible < transferAmount) {
      alert('Saldo disponible insuficiente para esta transferencia a ZenMeta.');
      return;
    }

    setZenMetas(prev => prev.map(meta => 
      meta.id === metaId ? { ...meta, currentAmount: meta.currentAmount + transferAmount } : meta
    ));
    
    setTransactions(prev => [...prev, {
      id: `transfer-to-zm-${Date.now()}`,
      type: 'expense',
      description: `Transferencia a ZenMeta: ${zenMetas.find(m => m.id === metaId)?.name}`,
      amount: transferAmount,
      category: 'ZenMeta',
      date: new Date().toISOString().split('T')[0],
    }]);

    alert('Dinero transferido a ZenMeta');
  };

  const handleWithdrawFromZenMeta = (metaId, amount) => {
    const withdrawAmount = parseFloat(amount);
    setZenMetas(prev => prev.map(meta => 
      meta.id === metaId ? { ...meta, currentAmount: meta.currentAmount - withdrawAmount } : meta
    ));

    setTransactions(prev => [...prev, {
      id: `withdrawal-from-zm-${Date.now()}`,
      type: 'income',
      description: `Retiro de ZenMeta: ${zenMetas.find(m => m.id === metaId)?.name}`,
      amount: withdrawAmount,
      category: 'ZenMeta',
      date: new Date().toISOString().split('T')[0],
    }]);

    alert('Dinero retirado de ZenMeta');
  };

  // Log para depuración
  useEffect(() => {
    console.log("ZenMetas en App.js:", zenMetas);
    console.log("Transactions en App.js:", transactions);
  }, [zenMetas, transactions]);


  const views = {
    home: (
      <HomeView 
        navigate={setCurrentView} 
        zenMetas={zenMetas} 
        transactions={transactions} 
        setTransactions={setTransactions}
        onAddZenMeta={handleAddZenMeta}
        onEditZenMeta={handleEditZenMeta}
        onDeleteZenMeta={handleDeleteZenMeta}
        onTransferToZenMeta={handleTransferToZenMeta}
        onWithdrawFromZenMeta={handleWithdrawFromZenMeta}
        alertThreshold={alertThreshold} // Pasar el umbral de alerta
      />
    ),
    stats: <StatsView navigate={setCurrentView} transactions={transactions} />, // Pasar transactions a StatsView
    settings: <SettingsView navigate={setCurrentView} alertThreshold={alertThreshold} setAlertThreshold={setAlertThreshold} />, // Pasar umbral y setter a SettingsView
    auth: <AuthScreen onAuth={() => { setAuthenticated(true); setCurrentView('home'); }} />,
    zenmetas: (
      <ZenMetasView
        navigate={setCurrentView}
        zenMetas={zenMetas}
        onAddZenMeta={handleAddZenMeta}
        onEditZenMeta={handleEditZenMeta}
        onDeleteZenMeta={handleDeleteZenMeta}
        onTransferToZenMeta={handleTransferToZenMeta}
        onWithdrawFromZenMeta={handleWithdrawFromZenMeta}
      />
    ),
  };

  if (!authenticated) {
    return views.auth;
  }

  return (
    <AppLayout currentView={currentView} navigate={setCurrentView}>
      {views[currentView] || views.home}
    </AppLayout>
  );
};

export default App;