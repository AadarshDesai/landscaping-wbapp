const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    throw new Error('Token is missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using your secret key
    return decoded.userId; // Return userId from decoded token
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};


// Helper to create an Audit Log
const createAuditLog = async (action, userId, projectId, details) => {
  try {
    await prismaClient.auditLog.create({
      data: {
        action,
        userId,
        projectId,
        details,
      },
    });
  } catch (error) {
    console.error('Error creating audit log:', error.message);
  }
};

// Helper to create a Notification
const createNotification = async (userId, message, projectId = null) => {
  try {
    await prismaClient.notification.create({
      data: {
        userId,
        message,
        projectId,
        isRead: false, // Default to unread
      },
    });
  } catch (error) {
    console.error('Error creating notification:', error.message);
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { name, description, status, projectId, userId } = req.body;

    // Check if the project exists
    const project = await prismaClient.project.findUnique({
      where: { id: Number(projectId) }, // Convert projectId to number
    });

    if (!project) {
      return res.status(400).json({ error: `Project with ID ${projectId} does not exist.` });
    }

    // Create task in the database
    const task = await prismaClient.task.create({
      data: {
        name,
        description,
        status,
        projectId: Number(projectId),
      },
    });

    // Create an audit log for task creation
    await createAuditLog('Task Created', userId, projectId, `Created task: ${task.name}`);

    // Notify relevant users about the new task
    const message = `A new task "${task.name}" has been created in project ${projectId}.`;
    await createNotification(userId, message, projectId);

    // Send the created task as the response
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Fetch tasks by project ID
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Fetch tasks for the given project
    const tasks = await prismaClient.task.findMany({
      where: { projectId: Number(projectId) },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Task ID from the route
    const { name, description, status } = req.body; // Fields to update
    const userId = verifyToken(req);
    // Check if the project exists
    const tasks = await prismaClient.task.findUnique({
      where: { id: Number(id) }, // Convert projectId to number here
    });


    // Update task in the database
    const updatedTask = await prismaClient.task.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        status,
      },
    });

    // Create an audit log for task update
    await createAuditLog('Task Updated', userId, id, `Updated task: ${updatedTask.name}`);

    // Notify relevant users about the task update
    const message = `Task "${updatedTask.name}" has been updated in task ${id}.`;
    await createNotification(userId, message, id);

    // Send the updated task as the response
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ error: error.message });
  }
};
