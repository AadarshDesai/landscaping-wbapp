const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const fileRoutes = require('./routes/fileRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');

app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/audit-logs', auditLogRoutes);

module.exports = app;
