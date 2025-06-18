import React, { useState, useContext } from 'react';
import { AppContext } from '../Layout/AppLayout';
import ZenMetaModal from './ZenMetaModal'; // Importar el modal de creación/edición

const ZenMetasView = ({ navigate, zenMetas, onAddZenMeta, onEditZenMeta, onDeleteZenMeta, onTransferToZenMeta, onWithdrawFromZenMeta }) => {
  const { selectedCurrency } = useContext(AppContext);
  const [isZenMetaModalOpen, setIsZenMetaModalOpen] = useState(false);
  const [zenMetaToEdit, setZenMetaToEdit] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMetaId, setSelectedMetaId] = useState(null);

  // Calcular saldo disponible para esta vista (debería venir de un estado global o prop)
  // Para esta demo, lo calculamos aquí, pero en una app real vendría de App.js
  const transactions = JSON.parse(localStorage.getItem('appTransactions') || '[]');
  const dineroReservadoZenMetas = zenMetas.reduce((sum, meta) => sum + meta.currentAmount, 0);
  const saldoTotal = transactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);
  const saldoDisponible = saldoTotal - dineroReservadoZenMetas;


  const formatAmount = (amount) => {
    return `${selectedCurrency.symbol}${amount.toFixed(2)}`;
  };

  const handleTransfer = () => {
    if (!selectedMetaId || !transferAmount) {
      alert('Selecciona una meta y un monto para transferir.');
      return;
    }
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Ingresa un monto válido.');
      return;
    }
    onTransferToZenMeta(selectedMetaId, amount);
    setTransferAmount('');
    setSelectedMetaId(null);
  };

  const handleWithdraw = () => {
    if (!selectedMetaId || !withdrawAmount) {
      alert('Selecciona una meta y un monto para retirar.');
      return;
    }
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Ingresa un monto válido.');
      return;
    }
    const meta = zenMetas.find(m => m.id === selectedMetaId);
    if (meta && amount > meta.currentAmount) {
      alert('No puedes retirar más de lo que tienes en la meta.');
      return;
    }
    onWithdrawFromZenMeta(selectedMetaId, amount);
    setWithdrawAmount('');
    setSelectedMetaId(null);
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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mis ZenMetas</h1>
        </div>
      </header>

      <div className="mb-6">
        <p className="text-lg font-medium text-gray-800 dark:text-white">
          Saldo Disponible: <span className="text-blue-600 dark:text-blue-400">{formatAmount(saldoDisponible)}</span>
        </p>
      </div>

      <button 
        onClick={() => { setZenMetaToEdit(null); setIsZenMetaModalOpen(true); }}
        className="w-full py-2 mb-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Crear Nueva ZenMeta
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {zenMetas.length === 0 ? (
          <p className="col-span-full text-gray-500 dark:text-gray-400 text-center">No tienes ZenMetas aún. ¡Crea una!</p>
        ) : (
          zenMetas.map(meta => {
            const progress = meta.targetAmount > 0 ? (meta.currentAmount / meta.targetAmount) * 100 : 0;
            const progressColor = progress >= 100 ? 'bg-green-500' : 'bg-blue-500';
            return (
              <div key={meta.id} className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl" style={{ color: meta.color }}>{meta.icon}</span>
                  <div className="flex space-x-2">
                    <button onClick={() => { setZenMetaToEdit(meta); setIsZenMetaModalOpen(true); }} className="text-blue-500 hover:text-blue-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                    </button>
                    <button onClick={() => onDeleteZenMeta(meta.id)} className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{meta.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {formatAmount(meta.currentAmount)} / {formatAmount(meta.targetAmount)}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-full rounded-full ${progressColor}`} 
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-1">{progress.toFixed(1)}%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Fecha: {meta.estimatedDate}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Mover Dinero</h3>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Seleccionar ZenMeta</label>
          <select
            value={selectedMetaId || ''}
            onChange={(e) => setSelectedMetaId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Selecciona una meta --</option>
            {zenMetas.map(meta => (
              <option key={meta.id} value={meta.id}>{meta.name}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Monto a Transferir</label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
            />
            <button
              onClick={handleTransfer}
              className="w-full py-2 mt-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Transferir a ZenMeta
            </button>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Monto a Retirar</label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="0.00"
            />
            <button
              onClick={handleWithdraw}
              className="w-full py-2 mt-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retirar de ZenMeta
            </button>
          </div>
        </div>
      </div>

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

export default ZenMetasView;