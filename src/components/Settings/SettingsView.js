import React from 'react';
import CurrencySelector from './CurrencySelector';
import ThemeCustomizer from './ThemeCustomizer';
import ExportData from './ExportData';
import ImportData from './ImportData';
import CloudBackup from './CloudBackup';
import Notifications from './Notifications';

const SettingsView = () => {
  return (
    <div className="space-y-4 mb-16">
      <CurrencySelector />
      <ThemeCustomizer />
      <ExportData />
      <ImportData />
      <CloudBackup />
      <Notifications />
    </div>
  );
};

export default SettingsView;