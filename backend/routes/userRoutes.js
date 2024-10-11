const express = require('express');
const { registerUser, loginUser, getUsersScores } = require('../controllers/userController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/scores', authenticate, getUsersScores); // Admin only

module.exports = router;
