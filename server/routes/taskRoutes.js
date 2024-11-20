const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/', taskController.createTask);
router.get('/:projectId', taskController.getTasksByProject);

module.exports = router;
