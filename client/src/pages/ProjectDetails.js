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
    <div>
      <h2>Project Details</h2>
      <TaskList projectId={projectId} />
      <NotificationList userId={userId} />
      <FileUpload projectId={projectId} />
      <InvoiceList projectId={projectId} />
      <AuditLogList projectId={projectId} />
    </div>
  );
};

export default ProjectDetails;
