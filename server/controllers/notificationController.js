exports.getNotifications = async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications = await prismaClient.notification.findMany({
        where: { userId: Number(userId) },
      });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.markAsRead = async (req, res) => {
    try {
      const { notificationId } = req.body;
      const notification = await prismaClient.notification.update({
        where: { id: Number(notificationId) },
        data: { read: true },
      });
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  