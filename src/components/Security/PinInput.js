import React, { useState } from 'react';

const PinInput = ({ onComplete }) => {
  const [pin, setPin] = useState('');

  const handleNumberPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(() => onComplete(), 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="w-64">
      <div className="flex justify-center mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-4 h-4 mx-2 rounded-full ${i <= pin.length ? 'bg-indigo-600' : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberPress(num.toString())}
            className="py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-medium"
          >
            {num}
          </button>
        ))}
        <button className="py-3 bg-gray-100 dark:bg-gray-700 rounded-lg"></button>
        <button
          onClick={() => handleNumberPress('0')}
          className="py-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-xl font-medium"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="py-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default PinInput;