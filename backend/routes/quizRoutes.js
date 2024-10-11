const express = require('express');
const { addQuiz, deleteQuiz, getQuizzes ,getQuizById} = require('../controllers/quizController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.post('/add', authenticate, addQuiz);
router.delete('/:id', authenticate, deleteQuiz);
router.get('/', authenticate, getQuizzes);
router.get('/:id', authenticate, getQuizById); // New route for getting quiz by ID

module.exports = router;
