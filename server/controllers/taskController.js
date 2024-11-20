const prisma = require('@prisma/client');
const { PrismaClient } = prisma;
const prismaClient = new PrismaClient();

exports.createTask = async (req, res) => {
  try {
    const { name, description, status, projectId } = req.body;
    const task = await prismaClient.task.create({
      data: {
        name,
        description,
        status,
        projectId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await prismaClient.task.findMany({
      where: { projectId: Number(projectId) },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
