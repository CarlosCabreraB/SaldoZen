import { useState } from 'react';

const useNavigation = (initialView = 'home') => {
  const [currentView, setCurrentView] = useState(initialView);
  const [viewHistory, setViewHistory] = useState([initialView]);
  
  const navigate = (viewName) => {
    setCurrentView(viewName);
    setViewHistory(prev => [...prev, viewName]);
  };
  
  const goBack = () => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop();
      setViewHistory(newHistory);
      setCurrentView(newHistory[newHistory.length - 1]);
    }
  };
  
  return { currentView, navigate, goBack, viewHistory };
};

export default useNavigation;