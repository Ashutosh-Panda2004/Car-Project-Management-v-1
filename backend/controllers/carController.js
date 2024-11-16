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
