const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all projects
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      include: { customer: true, landscaper: true },
    });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const { name, description, customerId } = req.body;
    const newProject = await prisma.project.create({
      data: { name, description, customerId, status: "pending" },
    });
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
};
