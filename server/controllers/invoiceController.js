const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create an invoice
exports.createInvoice = async (req, res) => {
  try {
    const { amount, dueDate, isRecurring, projectId } = req.body;

    // Validate the projectId to be a number
    if (!projectId || isNaN(Number(projectId))) {
      return res.status(400).json({ error: 'Invalid projectId' });
    }

    // Check if the projectId exists in the Project table
    const projectExists = await prisma.project.findUnique({
      where: {
        id: Number(projectId),
      },
    });

    if (!projectExists) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Create the invoice
    const invoice = await prisma.invoice.create({
      data: {
        amount,
        dueDate: new Date(dueDate), // Convert dueDate string to Date object
        isRecurring,
        projectId: Number(projectId), // Ensure projectId is treated as a number
      },
    });

    // Send back the created invoice
    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get invoices by project
exports.getInvoicesByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Validate the projectId to be a number
    if (!projectId || isNaN(Number(projectId))) {
      return res.status(400).json({ error: 'Invalid projectId' });
    }

    // Fetch invoices for a specific projectId
    const invoices = await prisma.invoice.findMany({
      where: {
        projectId: Number(projectId), // Ensure projectId is treated as a number
      },
    });

    if (invoices.length === 0) {
      return res.status(404).json({ message: 'No invoices found for this project.' });
    }

    // Return the invoices
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: error.message });
  }
};
