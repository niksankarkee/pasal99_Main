const User = require('../../models/user');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({
      message: 'Admin already registered',
    });
  }
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
    role: 'admin',
  });

  if (user) {
    return res.status(201).json({
      message: 'Admin created Successfully..',
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
        console.log(req.body.email);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
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
          message: 'Invalid password',
        });
      }
    } else {
      return res.status(400).json({ message: 'Something went wrong.' });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};
