import React, { useState } from 'react';

const StatsCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  
  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const startingDay = firstDayOfMonth(currentMonth);
    
    // Días vacíos al inicio
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // Días del mes
    for (let day = 1; day <= totalDays; day++) {
      const randomAmount = Math.random() * 200 - 100; // -100 a 100 para ejemplo
      const isPositive = randomAmount > 0;
      
      days.push(
        <div key={day} className="h-12 border-b border-gray-100 flex flex-col items-center justify-center">
          <span className="text-xs">{day}</span>
          {Math.abs(randomAmount) > 30 && (
            <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}></div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-medium">
          {monthName} {year}
        </h3>
        <button onClick={nextMonth} className="p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 pb-2">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default StatsCalendar;