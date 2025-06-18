import React, { useState } from 'react';
import { BiometricAuth } from 'react-native-biometrics';

const SecurityLock = () => {
  const [authMethod, setAuthMethod] = useState('pin');
  const [locked, setLocked] = useState(true);

  const handleUnlock = async () => {
    try {
      if (authMethod === 'biometric') {
        const { success } = await BiometricAuth.authenticate();
        if (success) setLocked(false);
      } else {
        // Lógica para PIN
        setLocked(false);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  if (locked) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-8">Desbloquear Aplicación</h2>
        
        {authMethod === 'pin' ? (
          <PinInput onComplete={handleUnlock} />
        ) : (
          <button 
            onClick={handleUnlock}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg flex items-center"
          >
            <BiometricIcon method={authMethod} />
            <span className="ml-2">Usar {authMethod === 'face' ? 'Reconocimiento Facial' : 'Huella Digital'}</span>
          </button>
        )}
        
        <div className="mt-6">
          <button 
            onClick={() => setAuthMethod(authMethod === 'pin' ? 'fingerprint' : 'pin')}
            className="text-indigo-600 dark:text-indigo-400"
          >
            {authMethod === 'pin' ? 'Usar Biometría' : 'Usar PIN'}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default SecurityLock;