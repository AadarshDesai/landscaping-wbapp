exports.createInvoice = async (req, res) => {
    try {
      const { amount, dueDate, isRecurring, projectId } = req.body;
      const invoice = await prismaClient.invoice.create({
        data: {
          amount,
          dueDate: new Date(dueDate),
          isRecurring,
          projectId,
        },
      });
      res.status(201).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getInvoicesByProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      const invoices = await prismaClient.invoice.findMany({
        where: { projectId: Number(projectId) },
      });
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  