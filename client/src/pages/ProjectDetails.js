import React from 'react';
import TaskList from '../components/TaskList';
import NotificationList from '../components/NotificationList';
import FileUpload from '../components/FileUpload';
import InvoiceList from '../components/InvoiceList';
import AuditLogList from '../components/AuditLogList';

const ProjectDetails = () => {
  const projectId = 1; // Hardcoded for simplicity
  const userId = 1; // Hardcoded for simplicity

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Project Details</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Task List */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <TaskList projectId={projectId} />
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <NotificationList userId={userId} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* File Upload */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <FileUpload projectId={projectId} />
          </div>

          {/* Invoice List */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <InvoiceList projectId={projectId} />
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <AuditLogList projectId={projectId} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
