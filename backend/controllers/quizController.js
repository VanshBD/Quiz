const Quiz = require('../models/Quiz');

// Add quiz (Admin only)
const addQuiz = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete quiz (Admin only)
const deleteQuiz = async (req, res) => {
    console.log('Requesting user:', req.user); // Log the user
    console.log('Attempting to delete quiz ID:', req.params.id); // Log the quiz ID
  
    if (req.user.role !== 'admin') {
      console.log('Access denied for user:', req.user.role); // Log the role if access is denied
      return res.status(403).json({ message: 'Access denied' });
    }
  
    try {
      await Quiz.findByIdAndDelete(req.params.id);
      res.json({ message: 'Quiz deleted' });
    } catch (error) {
      console.error('Error deleting quiz:', error); // Log the error
      res.status(500).json({ error: error.message });
    }
  };
  

// Get all quizzes (User access)
const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get quiz by ID (User access)
const getQuizById = async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { addQuiz, deleteQuiz, getQuizzes, getQuizById };
