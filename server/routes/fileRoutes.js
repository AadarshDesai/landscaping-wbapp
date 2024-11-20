const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

router.post('/', fileController.uploadFile);
router.get('/:projectId', fileController.getFilesByProject);

module.exports = router;
