// // backend/routes/carRoutes.js

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { protect } = require('../middleware/authMiddleware'); // Authentication middleware
// const {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
// } = require('../controllers/carController'); // Correctly importing controller functions

// // Multer Configuration: Memory Storage
// const storage = multer.memoryStorage();

// // File Filter: Allow Only Images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error('Only images are allowed (jpeg, jpg, png, gif).'));
//   }
// };

// // Initialize Multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
//   fileFilter: fileFilter,
// });

// // Routes

// /**
//  * @route   POST /api/cars
//  * @desc    Create a new car
//  * @access  Private
//  */
// router.post('/', protect, upload.array('images', 10), createCar);

// /**
//  * @route   GET /api/cars
//  * @desc    Get all cars for the logged-in user
//  * @access  Private
//  */
// router.get('/', protect, getCars);

// /**
//  * @route   GET /api/cars/:id
//  * @desc    Get a single car by ID
//  * @access  Private
//  */
// router.get('/:id', protect, getCarById);

// /**
//  * @route   PUT /api/cars/:id
//  * @desc    Update a car by ID
//  * @access  Private
//  */
// router.put('/:id', protect, upload.array('images', 10), updateCar);

// /**
//  * @route   DELETE /api/cars/:id
//  * @desc    Delete a car by ID
//  * @access  Private
//  */
// router.delete('/:id', protect, deleteCar);

// module.exports = router;















// backend/routes/carRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/authMiddleware'); // Authentication middleware
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} = require('../controllers/carController'); // Correctly importing controller functions

// Multer Configuration: Memory Storage
const storage = multer.memoryStorage();

// File Filter: Allow Only Images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, gif).'));
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
  fileFilter: fileFilter,
});

// Define Fields for Uploading Specific Images
const uploadFields = [
  { name: 'frontImage', maxCount: 1 },
  { name: 'rearImage', maxCount: 1 },
  { name: 'sideImage', maxCount: 1 },
  { name: 'interiorImage', maxCount: 1 },
  { name: 'dashboardImage', maxCount: 1 },
  { name: 'engineImage', maxCount: 1 },
  { name: 'trunkImage', maxCount: 1 },
  { name: 'roofImage', maxCount: 1 },
  { name: 'wheelImage', maxCount: 1 },
  { name: 'otherImage', maxCount: 1 },
];

/**
 * @route   POST /api/cars
 * @desc    Create a new car
 * @access  Private
 */
router.post('/', protect, upload.fields(uploadFields), createCar);

/**
 * @route   GET /api/cars
 * @desc    Get all cars for the logged-in user
 * @access  Private
 */
router.get('/', protect, getCars);

/**
 * @route   GET /api/cars/:id
 * @desc    Get a single car by ID
 * @access  Private
 */
router.get('/:id', protect, getCarById);

/**
 * @route   PUT /api/cars/:id
 * @desc    Update a car by ID
 * @access  Private
 */
router.put('/:id', protect, upload.fields(uploadFields), updateCar);

/**
 * @route   DELETE /api/cars/:id
 * @desc    Delete a car by ID
 * @access  Private
 */
router.delete('/:id', protect, deleteCar);

module.exports = router;
