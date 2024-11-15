// // backend/controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// // Register a new user
// exports.registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if user already exists
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     // Create new user
//     user = new User({
//       username,
//       email,
//       password,
//     });

//     // Hash password before saving
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     // Generate JWT token
//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' },
//       (err, token) => {
//         if (err) throw err;
//         res.status(201).json({ token });
//       }
//     );
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// // Login an existing user
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid Credentials' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid Credentials' });
//     }

//     // Generate JWT token
//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' },
//       (err, token) => {
//         if (err) throw err;
//         res.status(200).json({ token });
//       }
//     );
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Server error' });
//   }
// };

















// backend/controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Register a new user
 */
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: 'User already exists with this email.' });
    }

    // Create new user instance
    user = new User({
      username,
      email,
      password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to the database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign JWT and return it
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).send('Server error');
  }
};

/**
 * Authenticate user and get token
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Invalid credentials (email).' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: 'Invalid credentials (password).' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign JWT and return it
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).send('Server error');
  }
};
