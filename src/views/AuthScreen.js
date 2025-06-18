import React, { useState } from 'react';
import PinInput from '../components/Auth/PinInput';

const AuthScreen = ({ onAuth }) => {
  const [authMethod, setAuthMethod] = useState('pin');
  const [showBiometric, setShowBiometric] = useState(true); // Simula si la biometría está disponible

  const handleAuthSuccess = () => {
    onAuth();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Bienvenido a SaldoZen
        </h1>
        
        {authMethod === 'pin' ? (
          <PinInput onSuccess={handleAuthSuccess} />
        ) : (
          <div className="flex flex-col items-center">
            <button className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
              <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 11.5A2.5 2.5 0 019.5 9 2.5 2.5 0 0112 6.5 2.5 2.5 0 0114.5 9a2.5 2.5 0 01-2.5 2.5M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z" />
              </svg>
            </button>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Usar huella digital</p>
          </div>
        )}
        
        {showBiometric && (
          <button 
            onClick={() => setAuthMethod(authMethod === 'pin' ? 'biometric' : 'pin')}
            className="w-full mt-4 text-center text-indigo-600 dark:text-indigo-400 text-sm"
          >
            {authMethod === 'pin' ? 'Usar autenticación biométrica' : 'Usar PIN'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;