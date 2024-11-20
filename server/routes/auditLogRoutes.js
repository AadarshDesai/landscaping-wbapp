const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');

router.get('/:projectId', auditLogController.getLogsByProject);

module.exports = router;
