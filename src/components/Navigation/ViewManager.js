import React, { useState } from 'react';

const ViewManager = ({ views }) => {
  const [currentView, setCurrentView] = useState('home');
  
  const navigate = (viewName) => {
    if (views[viewName]) {
      setCurrentView(viewName);
    } else {
      console.warn(`View ${viewName} not found`);
    }
  };
  
  const CurrentView = views[currentView]?.component || (() => <div>View not found</div>);
  
  return (
    <>
      <CurrentView navigate={navigate} />
    </>
  );
};

export default ViewManager;