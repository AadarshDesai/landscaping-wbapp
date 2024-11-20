exports.createLog = async (action, userId, projectId, details) => {
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
  
  exports.getLogsByProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      const logs = await prismaClient.auditLog.findMany({
        where: { projectId: Number(projectId) },
      });
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  