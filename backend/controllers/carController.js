// // backend/controllers/carController.js

// const Car = require('../models/Car');
// const cloudinary = require('../config/cloudinaryConfig');

// // Helper Function: Upload Image Buffer to Cloudinary
// const uploadImage = (fileBuffer, folder = 'cars') => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: folder }, (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result.secure_url); // Use secure_url for HTTPS
//         }
//       })
//       .end(fileBuffer);
//   });
// };

// // Create a New Car
// const createCar = async (req, res) => {
//   try {
//     // Extract data from request body
//     const {
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//     } = req.body;

//     let images = [];

//     if (req.files && req.files.length > 0) {
//       // Upload each image to Cloudinary
//       const uploadPromises = req.files.map((file) => uploadImage(file.buffer));
//       images = await Promise.all(uploadPromises);
//     }

//     const newCar = new Car({
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//       images, // Array of image URLs
//       user: req.user.id, // Assumes auth middleware sets req.user
//     });

//     const savedCar = await newCar.save();
//     res.status(201).json(savedCar);
//   } catch (error) {
//     console.error('Error creating car:', error.message);
//     res.status(500).json({ error: 'Server error while creating car.' });
//   }
// };

// // Get All Cars for the Logged-in User
// const getCars = async (req, res) => {
//   try {
//     const cars = await Car.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json(cars);
//   } catch (error) {
//     console.error('Error fetching cars:', error.message);
//     res.status(500).json({ error: 'Server error while fetching cars.' });
//   }
// };

// // Get Single Car by ID
// const getCarById = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (!car) {
//       return res.status(404).json({ error: 'Car not found.' });
//     }

//     // Ensure the car belongs to the logged-in user
//     if (car.user.toString() !== req.user.id) {
//       return res.status(401).json({ error: 'Unauthorized access.' });
//     }

//     res.status(200).json(car);
//   } catch (error) {
//     console.error('Error fetching car:', error.message);
//     if (error.kind === 'ObjectId') {
//       return res.status(404).json({ error: 'Car not found.' });
//     }
//     res.status(500).json({ error: 'Server error while fetching car.' });
//   }
// };

// // Update an Existing Car
// const updateCar = async (req, res) => {
//   try {
//     // Extract data from request body
//     const {
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//     } = req.body;

//     let car = await Car.findById(req.params.id);

//     if (!car) {
//       return res.status(404).json({ error: 'Car not found.' });
//     }

//     // Ensure the car belongs to the logged-in user
//     if (car.user.toString() !== req.user.id) {
//       return res.status(401).json({ error: 'Unauthorized access.' });
//     }

//     // Handle uploaded images
//     if (req.files && req.files.length > 0) {
//       // Upload new images to Cloudinary
//       const uploadPromises = req.files.map((file) => uploadImage(file.buffer));
//       const newImages = await Promise.all(uploadPromises);
//       car.images = car.images.concat(newImages); // Append new images
//     }

//     // Update car details
//     car.make = make || car.make;
//     car.model = model || car.model;
//     car.year = year || car.year;
//     car.trimLevel = trimLevel || car.trimLevel;
//     car.color = color || car.color;
//     car.bodyType = bodyType || car.bodyType;
//     car.wheelSize = wheelSize || car.wheelSize;
//     car.numberOfDoors = numberOfDoors || car.numberOfDoors;
//     car.engineType = engineType || car.engineType;
//     car.horsepower = horsepower || car.horsepower;
//     car.torque = torque || car.torque;
//     car.transmissionType = transmissionType || car.transmissionType;
//     car.fuelType = fuelType || car.fuelType;
//     car.fuelEconomyCity = fuelEconomyCity || car.fuelEconomyCity;
//     car.fuelEconomyHighway = fuelEconomyHighway || car.fuelEconomyHighway;
//     car.tankCapacity = tankCapacity || car.tankCapacity;
//     car.seatMaterial = seatMaterial || car.seatMaterial;
//     car.numberOfSeats = numberOfSeats || car.numberOfSeats;
//     car.infotainmentSystem = infotainmentSystem || car.infotainmentSystem;
//     car.airConditioning = airConditioning || car.airConditioning;
//     car.airbags = airbags || car.airbags;
//     car.abs = abs !== undefined ? abs : car.abs;
//     car.backupCamera = backupCamera !== undefined ? backupCamera : car.backupCamera;
//     car.adaptiveCruiseControl =
//       adaptiveCruiseControl !== undefined
//         ? adaptiveCruiseControl
//         : car.adaptiveCruiseControl;
//     car.sunroof = sunroof || car.sunroof;
//     car.keylessEntry = keylessEntry || car.keylessEntry;
//     car.parkingAssist = parkingAssist || car.parkingAssist;
//     car.climatePackage = climatePackage || car.climatePackage;
//     car.currentMarketValue = currentMarketValue || car.currentMarketValue;
//     car.mileage = mileage || car.mileage;
//     car.condition = condition || car.condition;
//     car.accidentHistory =
//       accidentHistory !== undefined ? accidentHistory : car.accidentHistory;
//     car.accidentDetails = accidentDetails || car.accidentDetails;

//     const updatedCar = await car.save();
//     res.status(200).json(updatedCar);
//   } catch (error) {
//     console.error('Error updating car:', error.message);
//     res.status(500).json({ error: 'Server error while updating car.' });
//   }
// };

// // Delete a Car
// const deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (!car) {
//       return res.status(404).json({ error: 'Car not found.' });
//     }

//     // Ensure the car belongs to the logged-in user
//     if (car.user.toString() !== req.user.id) {
//       return res.status(401).json({ error: 'Unauthorized access.' });
//     }

//     // Delete images from Cloudinary
//     const deletePromises = car.images.map(async (imageUrl) => {
//       // Extract public ID from URL
//       const segments = imageUrl.split('/');
//       const fileName = segments[segments.length - 1];
//       const publicIdWithExtension = fileName.split('.')[0]; // Remove extension
//       const publicId = `cars/${publicIdWithExtension}`; // Assuming images are uploaded to 'cars' folder

//       await cloudinary.uploader.destroy(publicId);
//     });

//     await Promise.all(deletePromises);

//     await car.remove();
//     res.status(200).json({ message: 'Car and its images deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting car:', error.message);
//     res.status(500).json({ error: 'Server error while deleting car.' });
//   }
// };

// // Export Controller Functions
// module.exports = {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
// };














// // backend/controllers/carController.js

// const Car = require('../models/Car');
// const cloudinary = require('../config/cloudinaryConfig');

// // Helper Function: Upload Image Buffer to Cloudinary
// const uploadImage = (fileBuffer, folder = 'cars') => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ folder: folder }, (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result.secure_url); // Use secure_url for HTTPS
//         }
//       })
//       .end(fileBuffer);
//   });
// };

// // Define the specific image fields
// const imageFields = [
//   'frontImage',
//   'rearImage',
//   'sideImage',
//   'interiorImage',
//   'dashboardImage',
//   'engineImage',
//   'trunkImage',
//   'roofImage',
//   'wheelImage',
//   'otherImage',
// ];

// // Create a New Car
// const createCar = async (req, res) => {
//   try {
//     // Extract data from request body
//     const {
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//     } = req.body;

//     // Initialize an object to hold image URLs
//     const images = {};

//     // Iterate through each image field to upload and assign URLs
//     for (const field of imageFields) {
//       if (req.files && req.files[field]) {
//         // If multiple files are allowed per field, adjust accordingly
//         const file = req.files[field][0]; // Assuming one file per field
//         const imageUrl = await uploadImage(file.buffer, 'car_images');
//         images[field] = imageUrl;
//       } else {
//         images[field] = ''; // Assign empty string if no image provided
//       }
//     }

//     // Create a new Car instance with the uploaded image URLs
//     const newCar = new Car({
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//       ...images, // Spread the images object to assign each image field
//       user: req.user.id, // Assumes auth middleware sets req.user
//     });

//     const savedCar = await newCar.save();
//     res.status(201).json(savedCar);
//   } catch (error) {
//     console.error('Error creating car:', error.message);
//     res.status(500).json({ error: 'Server error while creating car.' });
//   }
// };

// // Get All Cars for the Logged-in User
// const getCars = async (req, res) => {
//   try {
//     const cars = await Car.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json(cars);
//   } catch (error) {
//     console.error('Error fetching cars:', error.message);
//     res.status(500).json({ error: 'Server error while fetching cars.' });
//   }
// };

// // Get Single Car by ID
// const getCarById = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (!car) {
//       return res.status(404).json({ error: 'Car not found.' });
//     }

//     // Ensure the car belongs to the logged-in user
//     if (car.user.toString() !== req.user.id) {
//       return res.status(401).json({ error: 'Unauthorized access.' });
//     }

//     res.status(200).json(car);
//   } catch (error) {
//     console.error('Error fetching car:', error.message);
//     if (error.kind === 'ObjectId') {
//       return res.status(404).json({ error: 'Car not found.' });
//     }
//     res.status(500).json({ error: 'Server error while fetching car.' });
//   }
// };

// // Update an Existing Car
// const updateCar = async (req, res) => {
//   try {
//     // Extract data from request body
//     const {
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//     } = req.body;

//     let car = await Car.findById(req.params.id);

//     if (!car) {
//       return res.status(404).json({ error: 'Car not found.' });
//     }

//     // Ensure the car belongs to the logged-in user
//     if (car.user.toString() !== req.user.id) {
//       return res.status(401).json({ error: 'Unauthorized access.' });
//     }

//     // Iterate through each image field to upload and assign URLs
//     for (const field of imageFields) {
//       if (req.files && req.files[field]) {
//         const file = req.files[field][0]; // Assuming one file per field
//         const imageUrl = await uploadImage(file.buffer, 'car_images');
//         car[field] = imageUrl;
//       }
//       // If no new image is uploaded for the field, retain the existing one
//     }

//     // Update car details
//     car.make = make || car.make;
//     car.model = model || car.model;
//     car.year = year || car.year;
//     car.trimLevel = trimLevel || car.trimLevel;
//     car.color = color || car.color;
//     car.bodyType = bodyType || car.bodyType;
//     car.wheelSize = wheelSize || car.wheelSize;
//     car.numberOfDoors = numberOfDoors || car.numberOfDoors;
//     car.engineType = engineType || car.engineType;
//     car.horsepower = horsepower || car.horsepower;
//     car.torque = torque || car.torque;
//     car.transmissionType = transmissionType || car.transmissionType;
//     car.fuelType = fuelType || car.fuelType;
//     car.fuelEconomyCity = fuelEconomyCity || car.fuelEconomyCity;
//     car.fuelEconomyHighway = fuelEconomyHighway || car.fuelEconomyHighway;
//     car.tankCapacity = tankCapacity || car.tankCapacity;
//     car.seatMaterial = seatMaterial || car.seatMaterial;
//     car.numberOfSeats = numberOfSeats || car.numberOfSeats;
//     car.infotainmentSystem = infotainmentSystem || car.infotainmentSystem;
//     car.airConditioning = airConditioning || car.airConditioning;
//     car.airbags = airbags || car.airbags;
//     car.abs = abs !== undefined ? abs : car.abs;
//     car.backupCamera = backupCamera !== undefined ? backupCamera : car.backupCamera;
//     car.adaptiveCruiseControl =
//       adaptiveCruiseControl !== undefined
//         ? adaptiveCruiseControl
//         : car.adaptiveCruiseControl;
//     car.sunroof = sunroof || car.sunroof;
//     car.keylessEntry = keylessEntry || car.keylessEntry;
//     car.parkingAssist = parkingAssist || car.parkingAssist;
//     car.climatePackage = climatePackage || car.climatePackage;
//     car.currentMarketValue = currentMarketValue || car.currentMarketValue;
//     car.mileage = mileage || car.mileage;
//     car.condition = condition || car.condition;
//     car.accidentHistory =
//       accidentHistory !== undefined ? accidentHistory : car.accidentHistory;
//     car.accidentDetails = accidentDetails || car.accidentDetails;

//     const updatedCar = await car.save();
//     res.status(200).json(updatedCar);
//   } catch (error) {
//     console.error('Error updating car:', error.message);
//     res.status(500).json({ error: 'Server error while updating car.' });
//   }
// };

// // Delete a Car
// const deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (!car) {
//       return res.status(404).json({ error: 'Car not found.' });
//     }

//     // Ensure the car belongs to the logged-in user
//     if (car.user.toString() !== req.user.id) {
//       return res.status(401).json({ error: 'Unauthorized access.' });
//     }

//     // Iterate through each image field to delete images from Cloudinary
//     for (const field of imageFields) {
//       if (car[field]) {
//         try {
//           // Extract public ID from the image URL
//           const segments = car[field].split('/');
//           const fileNameWithExtension = segments[segments.length - 1];
//           const fileName = fileNameWithExtension.split('.')[0]; // Remove extension
//           const publicId = `car_images/${fileName}`; // Assuming images are uploaded to 'car_images' folder

//           await cloudinary.uploader.destroy(publicId);
//         } catch (err) {
//           console.error(`Error deleting image ${field}:`, err.message);
//           // Continue deleting other images even if one fails
//         }
//       }
//     }

//     await car.remove();
//     res.status(200).json({ message: 'Car and its images deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting car:', error.message);
//     res.status(500).json({ error: 'Server error while deleting car.' });
//   }
// };

// // Export Controller Functions
// module.exports = {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
// };















// // backend/controllers/carController.js

// const Car = require('../models/Car');
// const path = require('path');
// const fs = require('fs');

// // Helper function to handle image paths
// const getImagePath = (file) => {
//   if (!file) return '';
//   return file.path; // For diskStorage, file.path contains the saved file path
// };

// // @desc    Create a new car
// // @route   POST /api/cars
// // @access  Private
// const createCar = async (req, res) => {
//   try {
//     const {
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//       user,
//     } = req.body;

//     // Validate required fields
//     if (!make || !model || !year || !mileage || !user) {
//       return res.status(400).json({ error: 'Please provide all required fields.' });
//     }

//     // Handle images
//     const frontImage = getImagePath(req.files.frontImage ? req.files.frontImage[0] : null);
//     const rearImage = getImagePath(req.files.rearImage ? req.files.rearImage[0] : null);
//     const sideImage = getImagePath(req.files.sideImage ? req.files.sideImage[0] : null);
//     const interiorImage = getImagePath(req.files.interiorImage ? req.files.interiorImage[0] : null);
//     const dashboardImage = getImagePath(req.files.dashboardImage ? req.files.dashboardImage[0] : null);
//     const engineImage = getImagePath(req.files.engineImage ? req.files.engineImage[0] : null);
//     const trunkImage = getImagePath(req.files.trunkImage ? req.files.trunkImage[0] : null);
//     const roofImage = getImagePath(req.files.roofImage ? req.files.roofImage[0] : null);
//     const wheelImage = getImagePath(req.files.wheelImage ? req.files.wheelImage[0] : null);
//     const otherImage = getImagePath(req.files.otherImage ? req.files.otherImage[0] : null);

//     // Create new car instance
//     const car = new Car({
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem: infotainmentSystem ? infotainmentSystem.split(',').map(item => item.trim()) : [],
//       airConditioning,
//       airbags: airbags ? airbags.split(',').map(item => item.trim()) : [],
//       abs: abs === 'true',
//       backupCamera: backupCamera === 'true',
//       adaptiveCruiseControl: adaptiveCruiseControl === 'true',
//       sunroof,
//       keylessEntry,
//       parkingAssist: parkingAssist ? parkingAssist.split(',').map(item => item.trim()) : [],
//       climatePackage: climatePackage ? climatePackage.split(',').map(item => item.trim()) : [],
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory: accidentHistory === 'true',
//       accidentDetails,
//       user,
//       frontImage,
//       rearImage,
//       sideImage,
//       interiorImage,
//       dashboardImage,
//       engineImage,
//       trunkImage,
//       roofImage,
//       wheelImage,
//       otherImage,
//     });

//     // Save to database
//     const createdCar = await car.save();

//     res.status(201).json(createdCar);
//   } catch (error) {
//     console.error('Error creating car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred.' });
//   }
// };

// // @desc    Get all cars for the logged-in user
// // @route   GET /api/cars
// // @access  Private
// const getCars = async (req, res) => {
//   try {
//     const cars = await Car.find({ user: req.user._id });
//     res.json(cars);
//   } catch (error) {
//     console.error('Error fetching cars:', error);
//     res.status(500).json({ error: 'An unexpected error occurred.' });
//   }
// };

// // @desc    Get a single car by ID
// // @route   GET /api/cars/:id
// // @access  Private
// const getCarById = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       res.json(car);
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to view this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error fetching car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred.' });
//   }
// };

// // @desc    Update a car by ID
// // @route   PUT /api/cars/:id
// // @access  Private
// const updateCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       const {
//         make,
//         model,
//         year,
//         trimLevel,
//         color,
//         bodyType,
//         wheelSize,
//         numberOfDoors,
//         engineType,
//         horsepower,
//         torque,
//         transmissionType,
//         fuelType,
//         fuelEconomyCity,
//         fuelEconomyHighway,
//         tankCapacity,
//         seatMaterial,
//         numberOfSeats,
//         infotainmentSystem,
//         airConditioning,
//         airbags,
//         abs,
//         backupCamera,
//         adaptiveCruiseControl,
//         sunroof,
//         keylessEntry,
//         parkingAssist,
//         climatePackage,
//         currentMarketValue,
//         mileage,
//         condition,
//         accidentHistory,
//         accidentDetails,
//       } = req.body;

//       // Update fields if they exist in the request
//       car.make = make || car.make;
//       car.model = model || car.model;
//       car.year = year || car.year;
//       car.trimLevel = trimLevel || car.trimLevel;
//       car.color = color || car.color;
//       car.bodyType = bodyType || car.bodyType;
//       car.wheelSize = wheelSize || car.wheelSize;
//       car.numberOfDoors = numberOfDoors || car.numberOfDoors;
//       car.engineType = engineType || car.engineType;
//       car.horsepower = horsepower || car.horsepower;
//       car.torque = torque || car.torque;
//       car.transmissionType = transmissionType || car.transmissionType;
//       car.fuelType = fuelType || car.fuelType;
//       car.fuelEconomyCity = fuelEconomyCity || car.fuelEconomyCity;
//       car.fuelEconomyHighway = fuelEconomyHighway || car.fuelEconomyHighway;
//       car.tankCapacity = tankCapacity || car.tankCapacity;
//       car.seatMaterial = seatMaterial || car.seatMaterial;
//       car.numberOfSeats = numberOfSeats || car.numberOfSeats;
//       car.infotainmentSystem = infotainmentSystem
//         ? infotainmentSystem.split(',').map(item => item.trim())
//         : car.infotainmentSystem;
//       car.airConditioning = airConditioning || car.airConditioning;
//       car.airbags = airbags
//         ? airbags.split(',').map(item => item.trim())
//         : car.airbags;
//       car.abs = abs === 'true' ? true : car.abs;
//       car.backupCamera = backupCamera === 'true' ? true : car.backupCamera;
//       car.adaptiveCruiseControl = adaptiveCruiseControl === 'true' ? true : car.adaptiveCruiseControl;
//       car.sunroof = sunroof || car.sunroof;
//       car.keylessEntry = keylessEntry || car.keylessEntry;
//       car.parkingAssist = parkingAssist
//         ? parkingAssist.split(',').map(item => item.trim())
//         : car.parkingAssist;
//       car.climatePackage = climatePackage
//         ? climatePackage.split(',').map(item => item.trim())
//         : car.climatePackage;
//       car.currentMarketValue = currentMarketValue || car.currentMarketValue;
//       car.mileage = mileage || car.mileage;
//       car.condition = condition || car.condition;
//       car.accidentHistory = accidentHistory === 'true' ? true : car.accidentHistory;
//       car.accidentDetails = accidentDetails || car.accidentDetails;

//       // Handle images
//       const imageFields = [
//         'frontImage',
//         'rearImage',
//         'sideImage',
//         'interiorImage',
//         'dashboardImage',
//         'engineImage',
//         'trunkImage',
//         'roofImage',
//         'wheelImage',
//         'otherImage',
//       ];

//       imageFields.forEach(field => {
//         if (req.files[field] && req.files[field][0]) {
//           // Optionally, delete the old image file from the server
//           if (car[field]) {
//             fs.unlink(car[field], (err) => {
//               if (err) console.error(`Error deleting file ${car[field]}:`, err);
//             });
//           }
//           car[field] = req.files[field][0].path;
//         }
//       });

//       // Save the updated car
//       const updatedCar = await car.save();
//       res.json(updatedCar);
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to update this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error updating car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred.' });
//   }
// };

// // @desc    Delete a car by ID
// // @route   DELETE /api/cars/:id
// // @access  Private
// const deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       // Optionally, delete image files from the server
//       const imageFields = [
//         'frontImage',
//         'rearImage',
//         'sideImage',
//         'interiorImage',
//         'dashboardImage',
//         'engineImage',
//         'trunkImage',
//         'roofImage',
//         'wheelImage',
//         'otherImage',
//       ];

//       imageFields.forEach(field => {
//         if (car[field]) {
//           fs.unlink(car[field], (err) => {
//             if (err) console.error(`Error deleting file ${car[field]}:`, err);
//           });
//         }
//       });

//       await car.remove();
//       res.json({ message: 'Car removed.' });
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to delete this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error deleting car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred.' });
//   }
// };

// module.exports = {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
// };























// const Car = require('../models/Car');
// const path = require('path');
// const fs = require('fs');

// // Helper function to handle image paths
// const getImagePath = (file) => {
//   if (!file) return '';
//   return file.path; // For diskStorage, file.path contains the saved file path
// };

// // @desc    Create a new car
// // @route   POST /api/cars
// // @access  Private
// const createCar = async (req, res) => {
//   try {
//     const {
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//       user,
//     } = req.body;

//     // Validate required fields
//     if (!make || !model ) {
//       return res.status(400).json({ error: 'Please provide all required fields.' });
//     }

//     // Handle images
//     const images = {};
//     const imageFields = [
//       'frontImage',
//       'rearImage',
//       'sideImage',
//       'interiorImage',
//       'dashboardImage',
//       'engineImage',
//       'trunkImage',
//       'roofImage',
//       'wheelImage',
//       'otherImage',
//     ];
//     imageFields.forEach((field) => {
//       images[field] = req.files[field] ? getImagePath(req.files[field][0]) : '';
//     });

//     // Create new car instance
//     const car = new Car({
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem: infotainmentSystem
//         ? infotainmentSystem.split(',').map((item) => item.trim())
//         : [],
//       airConditioning,
//       airbags: airbags ? airbags.split(',').map((item) => item.trim()) : [],
//       abs: abs === 'true',
//       backupCamera: backupCamera === 'true',
//       adaptiveCruiseControl: adaptiveCruiseControl === 'true',
//       sunroof,
//       keylessEntry,
//       parkingAssist: parkingAssist
//         ? parkingAssist.split(',').map((item) => item.trim())
//         : [],
//       climatePackage: climatePackage
//         ? climatePackage.split(',').map((item) => item.trim())
//         : [],
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory: accidentHistory === 'true',
//       accidentDetails,
//       user,
//       ...images,
//     });

//     // Save to database
//     const createdCar = await car.save();
//     res.status(201).json(createdCar);
//   } catch (error) {
//     console.error('Error creating car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred4.' });
//   }
// };

// // @desc    Get all cars for the logged-in user
// // @route   GET /api/cars
// // @access  Private
// const getCars = async (req, res) => {
//   try {
//     const cars = await Car.find({ user: req.user._id });
//     res.json(cars);
//   } catch (error) {
//     console.error('Error fetching cars:', error);
//     res.status(500).json({ error: 'An unexpected error occurred3.' });
//   }
// };

// // @desc    Get a single car by ID
// // @route   GET /api/cars/:id
// // @access  Private
// const getCarById = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       res.json(car);
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to view this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error fetching car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred2.' });
//   }
// };

// // @desc    Update a car by ID
// // @route   PUT /api/cars/:id
// // @access  Private
// const updateCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       const updateFields = req.body;

//       // Handle images
//       const imageFields = [
//         'frontImage',
//         'rearImage',
//         'sideImage',
//         'interiorImage',
//         'dashboardImage',
//         'engineImage',
//         'trunkImage',
//         'roofImage',
//         'wheelImage',
//         'otherImage',
//       ];

//       imageFields.forEach((field) => {
//         if (req.files[field] && req.files[field][0]) {
//           // Optionally, delete the old image file
//           if (car[field]) {
//             fs.unlink(car[field], (err) => {
//               if (err) console.error(`Error deleting file ${car[field]}:`, err);
//             });
//           }
//           car[field] = getImagePath(req.files[field][0]);
//         }
//       });

//       // Update fields
//       Object.keys(updateFields).forEach((key) => {
//         car[key] = updateFields[key] || car[key];
//       });

//       const updatedCar = await car.save();
//       res.json(updatedCar);
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to update this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error updating car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred5.' });
//   }
// };

// // @desc    Delete a car by ID
// // @route   DELETE /api/cars/:id
// // @access  Private
// const deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       const imageFields = [
//         'frontImage',
//         'rearImage',
//         'sideImage',
//         'interiorImage',
//         'dashboardImage',
//         'engineImage',
//         'trunkImage',
//         'roofImage',
//         'wheelImage',
//         'otherImage',
//       ];

//       imageFields.forEach((field) => {
//         if (car[field]) {
//           fs.unlink(car[field], (err) => {
//             if (err) console.error(`Error deleting file ${car[field]}:`, err);
//           });
//         }
//       });

//       await car.remove();
//       res.json({ message: 'Car removed.' });
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to delete this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error deleting car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred1.' });
//   }
// };

// module.exports = {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
// };












// const Car = require('../models/Car');
// const path = require('path');
// const fs = require('fs');

// // Helper function to handle image paths
// const getImagePath = (file) => {
//   if (!file) return '';
//   return file.path; // For diskStorage, file.path contains the saved file path
// };

// // @desc    Create a new car
// // @route   POST /api/cars
// // @access  Private
// const createCar = async (req, res) => {
//   try {
//     const {
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem,
//       airConditioning,
//       airbags,
//       abs,
//       backupCamera,
//       adaptiveCruiseControl,
//       sunroof,
//       keylessEntry,
//       parkingAssist,
//       climatePackage,
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory,
//       accidentDetails,
//     } = req.body;

//     // Get user ID from authenticated user (set in the 'protect' middleware)
//     const userId = req.user._id;

//     // Validate required fields
//     if (!make || !model) {
//       return res.status(400).json({ error: 'Please provide all required fields.' });
//     }

//     // Handle images
//     const images = {};
//     const imageFields = [
//       'frontImage',
//       'rearImage',
//       'sideImage',
//       'interiorImage',
//       'dashboardImage',
//       'engineImage',
//       'trunkImage',
//       'roofImage',
//       'wheelImage',
//       'otherImage',
//     ];

//     imageFields.forEach((field) => {
//       images[field] = req.files[field] ? getImagePath(req.files[field][0]) : '';
//     });

//     // Create new car instance
//     const car = new Car({
//       make,
//       model,
//       year,
//       trimLevel,
//       color,
//       bodyType,
//       wheelSize,
//       numberOfDoors,
//       engineType,
//       horsepower,
//       torque,
//       transmissionType,
//       fuelType,
//       fuelEconomyCity,
//       fuelEconomyHighway,
//       tankCapacity,
//       seatMaterial,
//       numberOfSeats,
//       infotainmentSystem: infotainmentSystem
//         ? infotainmentSystem.split(',').map((item) => item.trim())
//         : [],
//       airConditioning,
//       airbags: airbags ? airbags.split(',').map((item) => item.trim()) : [],
//       abs: abs === 'true',
//       backupCamera: backupCamera === 'true',
//       adaptiveCruiseControl: adaptiveCruiseControl === 'true',
//       sunroof,
//       keylessEntry,
//       parkingAssist: parkingAssist
//         ? parkingAssist.split(',').map((item) => item.trim())
//         : [],
//       climatePackage: climatePackage
//         ? climatePackage.split(',').map((item) => item.trim())
//         : [],
//       currentMarketValue,
//       mileage,
//       condition,
//       accidentHistory: accidentHistory === 'true',
//       accidentDetails,
//       user: userId,  // Set the user ID (from JWT token)
//       ...images,
//     });

//     // Save to database
//     const createdCar = await car.save();
//     res.status(201).json(createdCar);
//   } catch (error) {
//     console.error('Error creating car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred while creating the car.' });
//   }
// };

// // @desc    Get all cars for the logged-in user
// // @route   GET /api/cars
// // @access  Private
// const getCars = async (req, res) => {
//   try {
//     const cars = await Car.find({ user: req.user._id });  // Fetch cars by user ID
//     res.json(cars);
//   } catch (error) {
//     console.error('Error fetching cars:', error);
//     res.status(500).json({ error: 'An unexpected error occurred while fetching cars.' });
//   }
// };

// // @desc    Get a single car by ID
// // @route   GET /api/cars/:id
// // @access  Private
// const getCarById = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       res.json(car);
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to view this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error fetching car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred while fetching car details.' });
//   }
// };

// // @desc    Update a car by ID
// // @route   PUT /api/cars/:id
// // @access  Private
// const updateCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       const updateFields = req.body;

//       // Handle images
//       const imageFields = [
//         'frontImage',
//         'rearImage',
//         'sideImage',
//         'interiorImage',
//         'dashboardImage',
//         'engineImage',
//         'trunkImage',
//         'roofImage',
//         'wheelImage',
//         'otherImage',
//       ];

//       imageFields.forEach((field) => {
//         if (req.files[field] && req.files[field][0]) {
//           // Optionally, delete the old image file
//           if (car[field]) {
//             fs.unlink(car[field], (err) => {
//               if (err) console.error(`Error deleting file ${car[field]}:`, err);
//             });
//           }
//           car[field] = getImagePath(req.files[field][0]);
//         }
//       });

//       // Update fields
//       Object.keys(updateFields).forEach((key) => {
//         car[key] = updateFields[key] || car[key];
//       });

//       const updatedCar = await car.save();
//       res.json(updatedCar);
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to update this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error updating car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred while updating the car.' });
//   }
// };

// // @desc    Delete a car by ID
// // @route   DELETE /api/cars/:id
// // @access  Private
// const deleteCar = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);

//     if (car && car.user.toString() === req.user._id.toString()) {
//       const imageFields = [
//         'frontImage',
//         'rearImage',
//         'sideImage',
//         'interiorImage',
//         'dashboardImage',
//         'engineImage',
//         'trunkImage',
//         'roofImage',
//         'wheelImage',
//         'otherImage',
//       ];

//       imageFields.forEach((field) => {
//         if (car[field]) {
//           fs.unlink(car[field], (err) => {
//             if (err) console.error(`Error deleting file ${car[field]}:`, err);
//           });
//         }
//       });

//       await car.remove();
//       res.json({ message: 'Car removed.' });
//     } else if (car) {
//       res.status(401).json({ error: 'Not authorized to delete this car.' });
//     } else {
//       res.status(404).json({ error: 'Car not found.' });
//     }
//   } catch (error) {
//     console.error('Error deleting car:', error);
//     res.status(500).json({ error: 'An unexpected error occurred while deleting the car.' });
//   }
// };

// module.exports = {
//   createCar,
//   getCars,
//   getCarById,
//   updateCar,
//   deleteCar,
// };


const Car = require('../models/Car');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');

// Setup Multer to use memory storage (no local file system storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });  // Store file in memory

// Helper function to upload images to Cloudinary from memory buffer
const uploadImageToCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) throw new Error('No file provided');
    
    // Upload to Cloudinary directly from buffer
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'car_images',  // Folder in Cloudinary
          resource_type: 'image',  // Specify that it's an image
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          }
          resolve(result);
        }
      );
      
      // Pass the file buffer to Cloudinary
      uploadStream.end(fileBuffer);  // Use 'end' to upload the buffer
    });

    return result.secure_url;  // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Error uploading image to Cloudinary');
  }
};

// Create a new car
const createCar = async (req, res) => {
  try {
    const { 
      make, model, year, trimLevel, color, bodyType, wheelSize, 
      numberOfDoors, engineType, horsepower, torque, transmissionType, 
      fuelType, fuelEconomyCity, fuelEconomyHighway, tankCapacity, seatMaterial, 
      numberOfSeats, infotainmentSystem, airConditioning, airbags, abs, backupCamera, 
      adaptiveCruiseControl, sunroof, keylessEntry, parkingAssist, climatePackage, 
      currentMarketValue, mileage, condition, accidentHistory, accidentDetails 
    } = req.body;
    
    const userId = req.user._id;  // Get the user ID from the JWT token

    // Validate required fields
    if (!make || !model) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // Handle image uploads
    const images = {};
    const imageFields = [
      'frontImage', 'rearImage', 'sideImage', 'interiorImage', 'dashboardImage', 
      'engineImage', 'trunkImage', 'roofImage', 'wheelImage', 'otherImage'
    ];

    // Upload images to Cloudinary and store URLs
    for (const field of imageFields) {
      if (req.files && req.files[field]) {
        const uploadedImageUrl = await uploadImageToCloudinary(req.files[field][0].buffer);
        images[field] = uploadedImageUrl;
      } else {
        images[field] = ''; // If no file, set an empty string
      }
    }

    // Create a new car document
    const car = new Car({
      make,
      model,
      year,
      trimLevel,
      color,
      bodyType,
      wheelSize,
      numberOfDoors,
      engineType,
      horsepower,
      torque,
      transmissionType,
      fuelType,
      fuelEconomyCity,
      fuelEconomyHighway,
      tankCapacity,
      seatMaterial,
      numberOfSeats,
      infotainmentSystem: infotainmentSystem ? infotainmentSystem.split(',').map(item => item.trim()) : [],
      airConditioning,
      airbags: airbags ? airbags.split(',').map(item => item.trim()) : [],
      abs: abs === 'true',
      backupCamera: backupCamera === 'true',
      adaptiveCruiseControl: adaptiveCruiseControl === 'true',
      sunroof,
      keylessEntry,
      parkingAssist: parkingAssist ? parkingAssist.split(',').map(item => item.trim()) : [],
      climatePackage: climatePackage ? climatePackage.split(',').map(item => item.trim()) : [],
      currentMarketValue,
      mileage,
      condition,
      accidentHistory: accidentHistory === 'true',
      accidentDetails,
      user: userId,
      ...images,  // Include the uploaded image URLs
    });

    // Save the car document to the database
    const createdCar = await car.save();
    res.status(201).json(createdCar);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'An unexpected error occurred while creating the car.' });
  }
};

// Get all cars for the logged-in user
const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user._id });  // Find cars by user ID
    res.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'An unexpected error occurred while fetching cars.' });
  }
};

// Get a single car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car && car.user.toString() === req.user._id.toString()) {
      res.json(car);
    } else if (car) {
      res.status(401).json({ error: 'Not authorized to view this car.' });
    } else {
      res.status(404).json({ error: 'Car not found.' });
    }
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'An unexpected error occurred while fetching car details.' });
  }
};

// Update a car by ID
const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car && car.user.toString() === req.user._id.toString()) {
      const updateFields = req.body;

      // Handle image uploads
      const imageFields = [
        'frontImage', 'rearImage', 'sideImage', 'interiorImage', 'dashboardImage', 
        'engineImage', 'trunkImage', 'roofImage', 'wheelImage', 'otherImage'
      ];

      for (const field of imageFields) {
        if (req.files[field] && req.files[field][0]) {
          // Upload new image to Cloudinary and update the field
          car[field] = await uploadImageToCloudinary(req.files[field][0].buffer);
        }
      }

      // Update other fields
      Object.keys(updateFields).forEach((key) => {
        car[key] = updateFields[key] || car[key];
      });

      const updatedCar = await car.save();
      res.json(updatedCar);
    } else if (car) {
      res.status(401).json({ error: 'Not authorized to update this car.' });
    } else {
      res.status(404).json({ error: 'Car not found.' });
    }
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'An unexpected error occurred while updating the car.' });
  }
};

// Delete a car by ID
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car && car.user.toString() === req.user._id.toString()) {
      const imageFields = [
        'frontImage', 'rearImage', 'sideImage', 'interiorImage', 'dashboardImage', 
        'engineImage', 'trunkImage', 'roofImage', 'wheelImage', 'otherImage'
      ];

      // Delete images from Cloudinary (optional, but recommended if they are no longer used)
      imageFields.forEach((field) => {
        if (car[field]) {
          cloudinary.uploader.destroy(car[field], (err, result) => {
            if (err) console.error(`Error deleting image ${field}:`, err);
          });
        }
      });

      await car.remove();
      res.json({ message: 'Car removed.' });
    } else if (car) {
      res.status(401).json({ error: 'Not authorized to delete this car.' });
    } else {
      res.status(404).json({ error: 'Car not found.' });
    }
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'An unexpected error occurred while deleting the car.' });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
