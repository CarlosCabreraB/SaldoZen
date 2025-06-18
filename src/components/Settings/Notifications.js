import React, { useState } from 'react';

const Notifications = () => {
  const [emailReports, setEmailReports] = useState(true);
  const [reportFrequency, setReportFrequency] = useState('weekly');

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Notificaciones</h3>
      
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={emailReports}
            onChange={() => setEmailReports(!emailReports)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <span className="ml-2">Recibir resúmenes por email</span>
        </label>
      </div>
      
      {emailReports && (
        <div>
          <label className="block mb-2">Frecuencia</label>
          <select
            value={reportFrequency}
            onChange={(e) => setReportFrequency(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
          >
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Notifications;