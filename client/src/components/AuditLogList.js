import React, { useEffect, useState } from 'react';
import api from '../api/api';

const AuditLogList = ({ projectId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get(`/audit-logs/${projectId}`);
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [projectId]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Audit Logs</h3>
      {logs.length > 0 ? (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li
              key={log.id}
              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700">
                <span className="font-medium text-gray-900">{log.action}</span> by User{' '}
                <span className="font-medium text-indigo-600">{log.userId}</span> on{' '}
                <span className="text-gray-600">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No audit logs available.</p>
      )}
    </div>
  );
};

export default AuditLogList;
