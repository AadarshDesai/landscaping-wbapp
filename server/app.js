const express = require('express');
const app = express();
const cors = require('cors');


// Middleware
app.use(express.json());

//CORS
app.use(cors());

// Routes
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const projectRoutes = require('./routes/projectRoutes');
const fileRoutes = require('./routes/fileRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/audit-logs', auditLogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
