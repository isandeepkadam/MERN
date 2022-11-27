const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from the token
      req.user = await User.findById(decoded.id).select('-password'); // Mongoose to find User with decoded ID except password
      next();
    } catch (error) {
      res.status(401);
      res.send('Incorrect Token');
    }
  }

  if (!token) {
    res.status(401);
    res.send('Not Authorized, no Token');
  }
};

module.exports = { protect };
