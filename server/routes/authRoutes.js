const express = require('express');
const { register, login } = require('../controllers/authController');
const validateRegister = require('../middlewares/validateRegister'); // Optional validation middleware

const router = express.Router();

// User Registration
router.post('/register', validateRegister, register);

// User Login
router.post('/login', login);

module.exports = router;
