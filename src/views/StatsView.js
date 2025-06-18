import React, { useState, useEffect } from 'react';
import MonthlyChart from '../components/Stats/MonthlyChart';
import CategoryPieChart from '../components/Stats/CategoryPieChart';
// import SavingsProgress from '../components/Stats/SavingsProgress'; // Eliminado

const StatsView = ({ navigate, transactions }) => {
  // Procesar datos para MonthlyChart
  const getMonthlyData = (transactions) => {
    const monthlyIncomeMap = {};
    const monthlyExpenseMap = {};
    const monthsOrder = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const currentYear = new Date().getFullYear();

    transactions.forEach(t => {
      const date = new Date(t.date);
      if (date.getFullYear() === currentYear) { // Solo el año actual
        const monthName = monthsOrder[date.getMonth()];
        if (t.type === 'income') {
          monthlyIncomeMap[monthName] = (monthlyIncomeMap[monthName] || 0) + t.amount;
        } else if (t.type === 'expense') {
          monthlyExpenseMap[monthName] = (monthlyExpenseMap[monthName] || 0) + t.amount;
        }
      }
    });

    const incomeData = monthsOrder.map(month => monthlyIncomeMap[month] || 0);
    const expenseData = monthsOrder.map(month => monthlyExpenseMap[month] || 0);

    return { months: monthsOrder, incomeData, expenseData };
  };

  const monthlyData = getMonthlyData(transactions);

  // Procesar datos para CategoryPieChart
  const getCategoryExpenses = (transactions) => {
    const categoryMap = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
    return Object.keys(categoryMap).map(category => ({
      name: category,
      amount: categoryMap[category]
    }));
  };

  const categoriesData = getCategoryExpenses(transactions);

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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Estadísticas</h1>
        </div>
      </header>

      <div className="space-y-6">
        <MonthlyChart 
          months={monthlyData.months}
          incomeData={monthlyData.incomeData}
          expenseData={monthlyData.expenseData}
        />
        
        <CategoryPieChart categories={categoriesData} />
        
        {/* Eliminado: <SavingsProgress currentSavings={currentSavings} goalAmount={savingsGoal} /> */}
      </div>
    </div>
  );
};

export default StatsView;