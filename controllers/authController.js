const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("username", username, password);
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const user = await User.create({ username, password });
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};



exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("username",username,"password",password);
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
