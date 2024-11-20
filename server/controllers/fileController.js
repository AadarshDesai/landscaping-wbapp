exports.uploadFile = async (req, res) => {
    try {
      const { name, url, projectId } = req.body;
      const file = await prismaClient.file.create({
        data: {
          name,
          url,
          projectId,
        },
      });
      res.status(201).json(file);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getFilesByProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      const files = await prismaClient.file.findMany({
        where: { projectId: Number(projectId) },
      });
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  