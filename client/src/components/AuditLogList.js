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
    <div>
      <h3>Audit Logs</h3>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.action} by User {log.userId} on {new Date(log.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditLogList;
