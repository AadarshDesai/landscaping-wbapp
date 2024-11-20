const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/', invoiceController.createInvoice);
router.get('/:projectId', invoiceController.getInvoicesByProject);

module.exports = router;
