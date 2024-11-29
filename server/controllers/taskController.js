const prisma = require('@prisma/client');
const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { name, description, status, projectId } = req.body;

    const task = await prismaClient.task.create({
      data: {
        name,
        description,
        status,
        projectId: Number(projectId), // Ensure projectId is an integer
      },
    });

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

    const tasks = await prismaClient.task.findMany({
      where: { projectId: Number(projectId) }, // Ensure projectId is an integer
      orderBy: { createdAt: 'desc' }, // Optionally order tasks by creation date
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
    const { name, description, status, projectId, dueDate } = req.body; // Fields to update

    const updatedTask = await prismaClient.task.update({
      where: { id: Number(id) }, // Ensure the task ID is an integer
      data: {
        name,
        description,
        status,
        projectId: projectId ? Number(projectId) : undefined, // Convert to number if provided
        dueDate: dueDate ? new Date(dueDate) : undefined, // Convert to Date if provided
      },
    });

    res.status(200).json(updatedTask); // Return the updated task
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ error: error.message });
  }
};
