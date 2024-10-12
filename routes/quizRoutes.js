const express = require('express');
const {
  createQuiz,
  getQuizzes,
  getQuiz,
  submitQuiz,
} = require('../controllers/quizController');
const auth = require('../middlewares/authMiddelwares');
const router = express.Router();

router.post('/', auth, createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.post('/:id/submit', submitQuiz);

module.exports = router;
