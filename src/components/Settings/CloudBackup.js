import React, { useState } from 'react';

const CloudBackup = () => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupLocation, setBackupLocation] = useState('google');

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Copia en la Nube</h3>
      
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={autoBackup}
            onChange={() => setAutoBackup(!autoBackup)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2">Copia Automática</span>
        </label>
      </div>
      
      <div>
        <label className="block mb-2">Servicio de Nube</label>
        <select
          value={backupLocation}
          onChange={(e) => setBackupLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
        >
          <option value="google">Google Drive</option>
          <option value="icloud">iCloud</option>
          <option value="dropbox">Dropbox</option>
        </select>
      </div>
    </div>
  );
};

export default CloudBackup;