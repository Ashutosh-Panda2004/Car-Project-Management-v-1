// // backend/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');
// const { check, validationResult } = require('express-validator');

// /**
//  * @route   POST /api/auth/register
//  * @desc    Register a new user
//  * @access  Public
//  */
// router.post(
//   '/register',
//   [
//     check('username', 'Username is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password must be at least 6 characters').isLength({
//       min: 6,
//     }),
//   ],
//   async (req, res) => {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Call the controller function
//     await registerUser(req, res);
//   }
// );

// /**
//  * @route   POST /api/auth/login
//  * @desc    Authenticate user and get token
//  * @access  Public
//  */
// router.post(
//   '/login',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//   ],
//   async (req, res) => {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Call the controller function
//     await loginUser(req, res);
//   }
// );

// module.exports = router;










// // backend/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');
// const { check, validationResult } = require('express-validator');

// /**
//  * @route   POST /api/auth/register
//  * @desc    Register a new user
//  * @access  Public
//  */
// router.post(
//   '/register',
//   [
//     check('username', 'Username is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password must be at least 6 characters').isLength({
//       min: 6,
//     }),
//   ],
//   async (req, res) => {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Call the controller function
//     await registerUser(req, res);
//   }
// );

// /**
//  * @route   POST /api/auth/login
//  * @desc    Authenticate user and get token
//  * @access  Public
//  */
// router.post(
//   '/login',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//   ],
//   async (req, res) => {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Call the controller function
//     await loginUser(req, res);
//   }
// );

// module.exports = router;


















// // backend/routes/authRoutes.js

// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');
// const { check, validationResult } = require('express-validator');

// /**
//  * @route   POST /api/auth/register
//  * @desc    Register a new user
//  * @access  Public
//  */
// router.post(
//   '/register',
//   [
//     check('username', 'Username is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password must be at least 6 characters').isLength({
//       min: 6,
//     }),
//   ],
//   async (req, res) => {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Call the controller function
//     await registerUser(req, res);
//   }
// );

// /**
//  * @route   POST /api/auth/login
//  * @desc    Authenticate user and get token
//  * @access  Public
//  */
// router.post(
//   '/login',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//   ],
//   async (req, res) => {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Call the controller function
//     await loginUser(req, res);
//   }
// );

// module.exports = router;


















// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the controller function
    await registerUser(req, res);
  }
);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Call the controller function
    await loginUser(req, res);
  }
);

module.exports = router;
