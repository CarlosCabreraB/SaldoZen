import React, { useState } from 'react';
import StatsHeader from './StatsHeader';
import StatsMonthlyChart from './StatsMonthlyChart';
import StatsPieChart from './StatsPieChart';
import StatsCalendar from './StatsCalendar';
import StatsSavings from './StatsSavings';

const StatsView = () => {
  const [activeView, setActiveView] = useState('monthly');
  
  return (
    <div className="mb-16">
      <StatsHeader activeView={activeView} setActiveView={setActiveView} />
      
      {activeView === 'monthly' && <StatsMonthlyChart />}
      {activeView === 'categories' && <StatsPieChart />}
      {activeView === 'calendar' && <StatsCalendar />}
      {activeView === 'savings' && <StatsSavings />}
    </div>
  );
};

export default StatsView;