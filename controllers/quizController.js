const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  console.log("title",title,"question",questions);
  try {
    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ msg: 'Title and questions are required' });
    }
    const newQuiz = new Quiz({
      title,
      questions
    });
    await newQuiz.save();

    res.status(201).json({ msg: 'Quiz created successfully', quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.submitQuiz = async (req, res) => {
  const { answers } = req.body;
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        score++;
      }
    });

    res.json({ score, total: quiz.questions.length });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
