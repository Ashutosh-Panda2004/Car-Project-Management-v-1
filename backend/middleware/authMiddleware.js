// // backend/middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Protect Middleware
// const protect = async (req, res, next) => {
//   let token;

//   // Check for token in Authorization header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from the token without password
//       req.user = await User.findById(decoded.user.id).select('-password');

//       next();
//     } catch (error) {
//       console.error('Token verification failed:', error.message);
//       res.status(401).json({ error: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ error: 'Not authorized, no token' });
//   }
// };

// module.exports = { protect };






// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect Middleware
const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token without password
      req.user = await User.findById(decoded.user.id).select('-password');

      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

module.exports = { protect };
