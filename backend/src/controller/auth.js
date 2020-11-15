const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({
      message: 'User already registered',
    });
  }
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
  });

  if (user) {
    return res.status(201).json({
      message: 'User created Successfully..',
    });
  } else {
    return res.status(400).json({
      message: 'Something went wrong',
    });
  }
};

exports.signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: 'Invalid Username or password',
        });
      }
    } else {
      return res.status(400).json({ message: 'Something went wrong.' });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
