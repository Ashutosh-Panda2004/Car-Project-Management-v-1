// // backend/models/Car.js

// const mongoose = require('mongoose');

// const CarSchema = new mongoose.Schema({
//   // Basic Details
//   make: {
//     type: String,
//     required: [true, 'Car make is required'],
//   },
//   model: {
//     type: String,
//     required: [true, 'Car model is required'],
//   },
//   year: {
//     type: Number,
//     required: [true, 'Car year is required'],
//   },
//   trimLevel: {
//     type: String,
//   },

//   // Exterior
//   color: {
//     type: String,
//   },
//   bodyType: {
//     type: String,
//   },
//   wheelSize: {
//     type: Number, // in inches
//   },
//   numberOfDoors: {
//     type: Number,
//   },

//   // Engine and Performance
//   engineType: {
//     type: String,
//   },
//   horsepower: {
//     type: Number,
//   },
//   torque: {
//     type: Number, // in lb-ft
//   },
//   transmissionType: {
//     type: String,
//   },

//   // Fuel & Efficiency
//   fuelType: {
//     type: String,
//   },
//   fuelEconomyCity: {
//     type: Number, // MPG
//   },
//   fuelEconomyHighway: {
//     type: Number, // MPG
//   },
//   tankCapacity: {
//     type: Number, // in gallons
//   },

//   // Interior & Comfort
//   seatMaterial: {
//     type: String,
//   },
//   numberOfSeats: {
//     type: Number,
//   },
//   infotainmentSystem: {
//     type: [String], // e.g., ['Bluetooth', 'Navigation']
//   },
//   airConditioning: {
//     type: String, // e.g., 'Basic', 'Climate Control'
//   },

//   // Safety Features
//   airbags: {
//     type: [String], // e.g., ['Front', 'Side']
//   },
//   abs: {
//     type: Boolean,
//   },
//   backupCamera: {
//     type: Boolean,
//   },
//   adaptiveCruiseControl: {
//     type: Boolean,
//   },

//   // Additional Features
//   sunroof: {
//     type: String, // e.g., 'Panoramic', 'Standard', or 'None'
//   },
//   keylessEntry: {
//     type: String, // e.g., 'Remote', 'Proximity', or 'None'
//   },
//   parkingAssist: {
//     type: [String], // e.g., ['Front', 'Rear']
//   },
//   climatePackage: {
//     type: [String], // e.g., ['Heated Seats', 'Steering Wheel']
//   },

//   // Pricing & Ownership
//   currentMarketValue: {
//     type: Number, // in USD
//   },
//   mileage: {
//     type: Number, // in miles
//   },
//   condition: {
//     type: String, // e.g., 'New', 'Used', 'Fair', 'Good', 'Excellent'
//   },
//   accidentHistory: {
//     type: Boolean,
//   },
//   accidentDetails: {
//     type: String, // URL to accident report or detailed description
//   },

//   // Images
//   images: [
//     {
//       type: String, // URLs from Cloudinary
//     },
//   ],

//   // Ownership
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },

//   // Timestamps
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Car', CarSchema);






























// // backend/models/Car.js

// const mongoose = require('mongoose');

// const CarSchema = new mongoose.Schema({
//   // Basic Details
//   make: {
//     type: String,
//     required: [true, 'Car make is required'],
//   },
//   model: {
//     type: String,
//     required: [true, 'Car model is required'],
//   },
//   year: {
//     type: Number,
//     required: [true, 'Car year is required'],
//   },
//   trimLevel: {
//     type: String,
//   },

//   // Exterior
//   color: {
//     type: String,
//   },
//   bodyType: {
//     type: String,
//   },
//   wheelSize: {
//     type: Number, // in inches
//   },
//   numberOfDoors: {
//     type: Number,
//   },

//   // Engine and Performance
//   engineType: {
//     type: String,
//   },
//   horsepower: {
//     type: Number,
//   },
//   torque: {
//     type: Number, // in lb-ft
//   },
//   transmissionType: {
//     type: String,
//   },

//   // Fuel & Efficiency
//   fuelType: {
//     type: String,
//   },
//   fuelEconomyCity: {
//     type: Number, // MPG
//   },
//   fuelEconomyHighway: {
//     type: Number, // MPG
//   },
//   tankCapacity: {
//     type: Number, // in gallons
//   },

//   // Interior & Comfort
//   seatMaterial: {
//     type: String,
//   },
//   numberOfSeats: {
//     type: Number,
//   },
//   infotainmentSystem: {
//     type: [String], // e.g., ['Bluetooth', 'Navigation']
//   },
//   airConditioning: {
//     type: String, // e.g., 'Basic', 'Climate Control'
//   },

//   // Safety Features
//   airbags: {
//     type: [String], // e.g., ['Front', 'Side']
//   },
//   abs: {
//     type: Boolean,
//   },
//   backupCamera: {
//     type: Boolean,
//   },
//   adaptiveCruiseControl: {
//     type: Boolean,
//   },

//   // Additional Features
//   sunroof: {
//     type: String, // e.g., 'Panoramic', 'Standard', or 'None'
//   },
//   keylessEntry: {
//     type: String, // e.g., 'Remote', 'Proximity', or 'None'
//   },
//   parkingAssist: {
//     type: [String], // e.g., ['Front', 'Rear']
//   },
//   climatePackage: {
//     type: [String], // e.g., ['Heated Seats', 'Steering Wheel']
//   },

//   // Pricing & Ownership
//   currentMarketValue: {
//     type: Number, // in USD
//   },
//   mileage: {
//     type: Number, // in miles
//   },
//   condition: {
//     type: String, // e.g., 'New', 'Used', 'Fair', 'Good', 'Excellent'
//   },
//   accidentHistory: {
//     type: Boolean,
//   },
//   accidentDetails: {
//     type: String, // URL to accident report or detailed description
//   },

//   // Images - Separate Fields for Each View
//   frontImage: {
//     type: String, // URL from Cloudinary
//     default: '', // Optional: Set default value if needed
//   },
//   rearImage: {
//     type: String,
//     default: '',
//   },
//   sideImage: {
//     type: String,
//     default: '',
//   },
//   interiorImage: {
//     type: String,
//     default: '',
//   },
//   dashboardImage: {
//     type: String,
//     default: '',
//   },
//   engineImage: {
//     type: String,
//     default: '',
//   },
//   trunkImage: {
//     type: String,
//     default: '',
//   },
//   roofImage: {
//     type: String,
//     default: '',
//   },
//   wheelImage: {
//     type: String,
//     default: '',
//   },
//   otherImage: {
//     type: String,
//     default: '',
//   },

//   // Ownership
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },

//   // Timestamps
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Optional: Add a pre-save hook to enforce a maximum number of images
// CarSchema.pre('save', function (next) {
//   const imageFields = [
//     this.frontImage,
//     this.rearImage,
//     this.sideImage,
//     this.interiorImage,
//     this.dashboardImage,
//     this.engineImage,
//     this.trunkImage,
//     this.roofImage,
//     this.wheelImage,
//     this.otherImage,
//   ];

//   // Count how many image fields are populated
//   const populatedImages = imageFields.filter((img) => img && img.trim() !== '');

//   if (populatedImages.length > 10) {
//     return next(new Error('A car can have a maximum of 10 images.'));
//   }

//   next();
// });

// module.exports = mongoose.model('Car', CarSchema);













const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  // Basic Details
  make: {
    type: String,
    required: [true, 'Car make is required'],
  },
  model: {
    type: String,
    required: [true, 'Car model is required'],
  },
  year: {
    type: Number,
    required: [true, 'Car year is required'],
    min: [1886, 'Year must be after the first car was invented (1886)'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the distant future'],
  },
  trimLevel: {
    type: String,
    default: '',
  },

  // Exterior
  color: {
    type: String,
    default: '#ffffff', // Default color
  },
  bodyType: {
    type: String,
    default: '',
  },
  wheelSize: {
    type: Number, // in inches
    default: 18, // Default wheel size
  },
  numberOfDoors: {
    type: Number,
    default: 4,
  },

  // Engine and Performance
  engineType: {
    type: String,
    default: '',
  },
  horsepower: {
    type: Number,
    default: 0,
  },
  torque: {
    type: Number, // in lb-ft
    default: 0,
  },
  transmissionType: {
    type: String,
    default: '',
  },

  // Fuel & Efficiency
  fuelType: {
    type: String,
    default: '',
  },
  fuelEconomyCity: {
    type: Number, // MPG
    default: 0,
  },
  fuelEconomyHighway: {
    type: Number, // MPG
    default: 0,
  },
  tankCapacity: {
    type: Number, // in gallons
    default: 0,
  },

  // Interior & Comfort
  seatMaterial: {
    type: String,
    default: '',
  },
  numberOfSeats: {
    type: Number,
    default: 5,
  },
  infotainmentSystem: {
    type: [String], // e.g., ['Bluetooth', 'Navigation']
    default: [],
  },
  airConditioning: {
    type: String, // e.g., 'Basic', 'Climate Control'
    default: '',
  },

  // Safety Features
  airbags: {
    type: [String], // e.g., ['Front', 'Side']
    default: [],
  },
  abs: {
    type: Boolean,
    default: false,
  },
  backupCamera: {
    type: Boolean,
    default: false,
  },
  adaptiveCruiseControl: {
    type: Boolean,
    default: false,
  },

  // Additional Features
  sunroof: {
    type: String, // e.g., 'Panoramic', 'Standard', or 'None'
    default: 'None',
  },
  keylessEntry: {
    type: String, // e.g., 'Remote', 'Proximity', or 'None'
    default: 'None',
  },
  parkingAssist: {
    type: [String], // e.g., ['Front', 'Rear']
    default: [],
  },
  climatePackage: {
    type: [String], // e.g., ['Heated Seats', 'Steering Wheel']
    default: [],
  },

  // Pricing & Ownership
  currentMarketValue: {
    type: Number, // in USD
    default: 0,
  },
  mileage: {
    type: Number, // in miles
    default: 0,
  },
  condition: {
    type: String, // e.g., 'New', 'Used', 'Fair', 'Good', 'Excellent'
    default: '',
  },
  accidentHistory: {
    type: Boolean,
    default: false,
  },
  accidentDetails: {
    type: String, // URL to accident report or detailed description
    default: '',
  },

  // Images - Separate Fields for Each View
  frontImage: {
    type: String, // URL from Cloudinary
    default: '',
  },
  rearImage: {
    type: String,
    default: '',
  },
  sideImage: {
    type: String,
    default: '',
  },
  interiorImage: {
    type: String,
    default: '',
  },
  dashboardImage: {
    type: String,
    default: '',
  },
  engineImage: {
    type: String,
    default: '',
  },
  trunkImage: {
    type: String,
    default: '',
  },
  roofImage: {
    type: String,
    default: '',
  },
  wheelImage: {
    type: String,
    default: '',
  },
  otherImage: {
    type: String,
    default: '',
  },

  // Ownership
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required for car ownership'],
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to enforce a maximum number of images
CarSchema.pre('save', function (next) {
  const imageFields = [
    this.frontImage,
    this.rearImage,
    this.sideImage,
    this.interiorImage,
    this.dashboardImage,
    this.engineImage,
    this.trunkImage,
    this.roofImage,
    this.wheelImage,
    this.otherImage,
  ];

  // Count how many image fields are populated
  const populatedImages = imageFields.filter((img) => img && img.trim() !== '');

  if (populatedImages.length > 10) {
    return next(new Error('A car can have a maximum of 10 images.'));
  }

  next();
});

module.exports = mongoose.model('Car', CarSchema);
