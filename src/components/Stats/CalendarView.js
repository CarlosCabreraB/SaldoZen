import React, { useState } from 'react';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  
  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentDate);
    const startingDay = firstDayOfMonth(currentDate);
    
    // Empty days at start
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }
    
    // Actual days
    for (let day = 1; day <= totalDays; day++) {
      const randomAmount = Math.random() * 200 - 100; // Demo data
      const hasTransaction = Math.abs(randomAmount) > 30;
      
      days.push(
        <div key={day} className="h-12 border-b border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
          <span className="text-xs">{day}</span>
          {hasTransaction && (
            <div className={`w-2 h-1 rounded-full ${randomAmount > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
          {monthName} {year}
        </h3>
        
        <button 
          onClick={nextMonth}
          className="p-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
          <div key={day} className="text-xs font-medium text-gray-500 dark:text-gray-400 pb-2">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default CalendarView;

// DONE