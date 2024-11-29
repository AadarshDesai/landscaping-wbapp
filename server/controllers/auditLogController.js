const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to create a log entry
exports.createLog = async (action, userId, projectId, details) => {
  try {
    await prisma.auditLog.create({
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

// Function to get logs by project ID
exports.getLogsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const logs = await prisma.auditLog.findMany({
      where: { projectId: Number(projectId) },
    });

    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error.message);
    res.status(500).json({ error: error.message });
  }
};
