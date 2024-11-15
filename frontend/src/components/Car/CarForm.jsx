// // frontend/src/components/Car/CarForm.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Grid,
//   Typography,
//   Slider,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Switch,
//   Tooltip,
//   Box,
//   Toolbar
// } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import Navbar from '../Navbar'; // Corrected import path
// import { useNavigate, useParams } from 'react-router-dom';
// import { SketchPicker } from 'react-color';
// import InfoIcon from '@mui/icons-material/Info';

// const CarForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // For editing an existing car

//   // Initialize formik first
//   const formik = useFormik({
//     initialValues: {
//       // Basic Details
//       make: '',
//       model: '',
//       year: 2020,
//       trimLevel: '',

//       // Exterior
//       color: '#ffffff',
//       bodyType: '',
//       wheelSize: 18,
//       numberOfDoors: 4,

//       // Engine and Performance
//       engineType: '',
//       horsepower: 150,
//       torque: 200,
//       transmissionType: 'Automatic',

//       // Fuel & Efficiency
//       fuelType: '',
//       fuelEconomyCity: 20,
//       fuelEconomyHighway: 30,
//       tankCapacity: 15,

//       // Interior & Comfort
//       seatMaterial: '',
//       numberOfSeats: 5,
//       infotainmentSystem: [],
//       airConditioning: 'Basic',

//       // Safety Features
//       airbags: [],
//       abs: false,
//       backupCamera: false,
//       adaptiveCruiseControl: false,

//       // Additional Features
//       sunroof: 'None',
//       keylessEntry: 'None',
//       parkingAssist: [],
//       climatePackage: [],

//       // Pricing & Ownership
//       currentMarketValue: 20000,
//       mileage: 5000,
//       condition: '',
//       accidentHistory: false,
//       accidentDetails: '',

//       // Images
//       images: [],
//     },
//     validationSchema: Yup.object({
//       make: Yup.string().required('Car Make is required'),
//       model: Yup.string().required('Car Model is required'),
//       year: Yup.number()
//         .min(1886, 'Enter a valid year') // The year the first car was invented
//         .max(new Date().getFullYear() + 1, 'Enter a valid year')
//         .required('Year is required'),
//       // Add more validations as needed
//     }),
//     onSubmit: async (values, { setSubmitting, setErrors }) => {
//       try {
//         const formData = new FormData();

//         // Append all form fields
//         for (const key in values) {
//           if (
//             key === 'infotainmentSystem' ||
//             key === 'airbags' ||
//             key === 'parkingAssist' ||
//             key === 'climatePackage'
//           ) {
//             values[key].forEach((item) => formData.append(`${key}[]`, item));
//           } else if (key === 'images') {
//             // 'images' is a FileList
//             Array.from(values[key]).forEach((file) => formData.append('images', file));
//           } else {
//             formData.append(key, values[key]);
//           }
//         }

//         const token = localStorage.getItem('token');
//         const config = {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         if (id) {
//           // Update existing car
//           await axios.put(`${import.meta.env.VITE_API_URL}/cars/${id}`, formData, config);
//         } else {
//           // Create new car
//           await axios.post(`${import.meta.env.VITE_API_URL}/cars`, formData, config);
//         }

//         navigate('/dashboard'); // Redirect to dashboard after submission
//       } catch (error) {
//         console.error('Error submitting form:', error.response);
//         setErrors({ submit: error.response?.data?.error || 'An error occurred' });
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   // State hooks
//   const [makes, setMakes] = useState([]);
//   const [models, setModels] = useState([]);
//   const [bodyTypes] = useState(['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible']);
//   const [selectedColor, setSelectedColor] = useState('#ffffff');
//   const [infotainmentOptions, setInfotainmentOptions] = useState({
//     Bluetooth: false,
//     Navigation: false,
//     AppleCarPlay: false,
//   });
//   const [safetyFeatures, setSafetyFeatures] = useState({
//     Front: false,
//     Side: false,
//     Curtain: false,
//   });
//   const [parkingAssistOptions, setParkingAssistOptions] = useState({
//     Front: false,
//     Rear: false,
//     '360': false,
//   });
//   const [climatePackage, setClimatePackage] = useState({
//     HeatedSeats: false,
//     HeatedSteeringWheel: false,
//   });

//   useEffect(() => {
//     // Fetch car makes from an API or define them statically
//     // For simplicity, defining them statically here
//     const carMakes = ['Toyota', 'Ford', 'BMW', 'Honda', 'Chevrolet'];
//     setMakes(carMakes);
//   }, []);

//   useEffect(() => {
//     // Populate models based on selected make
//     const carModels = {
//       Toyota: ['Corolla', 'Camry', 'RAV4', 'Prius'],
//       Ford: ['F-150', 'Mustang', 'Explorer', 'Focus'],
//       BMW: ['3 Series', '5 Series', 'X3', 'X5'],
//       Honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
//       Chevrolet: ['Silverado', 'Malibu', 'Equinox', 'Impala'],
//     };

//     if (formik.values.make) {
//       setModels(carModels[formik.values.make] || []);
//       formik.setFieldValue('model', '');
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [formik.values.make]);

//   // Handlers
//   const handleColorChange = (color) => {
//     setSelectedColor(color.hex);
//     formik.setFieldValue('color', color.hex);
//   };

//   const handleInfotainmentChange = (event) => {
//     const { name, checked } = event.target;
//     setInfotainmentOptions((prev) => ({ ...prev, [name]: checked }));
//     if (checked) {
//       formik.setFieldValue('infotainmentSystem', [...formik.values.infotainmentSystem, name]);
//     } else {
//       formik.setFieldValue(
//         'infotainmentSystem',
//         formik.values.infotainmentSystem.filter((item) => item !== name)
//       );
//     }
//   };

//   const handleSafetyFeaturesChange = (event) => {
//     const { name, checked } = event.target;
//     setSafetyFeatures((prev) => ({ ...prev, [name]: checked }));
//     if (checked) {
//       formik.setFieldValue('airbags', [...formik.values.airbags, name]);
//     } else {
//       formik.setFieldValue(
//         'airbags',
//         formik.values.airbags.filter((item) => item !== name)
//       );
//     }
//   };

//   const handleParkingAssistChange = (event) => {
//     const { name, checked } = event.target;
//     setParkingAssistOptions((prev) => ({ ...prev, [name]: checked }));
//     if (checked) {
//       formik.setFieldValue('parkingAssist', [...formik.values.parkingAssist, name]);
//     } else {
//       formik.setFieldValue(
//         'parkingAssist',
//         formik.values.parkingAssist.filter((item) => item !== name)
//       );
//     }
//   };

//   const handleClimatePackageChange = (event) => {
//     const { name, checked } = event.target;
//     setClimatePackage((prev) => ({ ...prev, [name]: checked }));
//     if (checked) {
//       formik.setFieldValue('climatePackage', [...formik.values.climatePackage, name]);
//     } else {
//       formik.setFieldValue(
//         'climatePackage',
//         formik.values.climatePackage.filter((item) => item !== name)
//       );
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <Toolbar />
//       <Box sx={{ padding: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           {id ? 'Edit Car' : 'Add New Car'}
//         </Typography>
//         <form onSubmit={formik.handleSubmit}>
//           <Grid container spacing={3}>
//             {/* Basic Details */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Basic Details</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Car Make *</InputLabel>
//                 <Select
//                   label="Car Make *"
//                   name="make"
//                   value={formik.values.make}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.make && Boolean(formik.errors.make)}
//                 >
//                   {makes.map((make) => (
//                     <MenuItem key={make} value={make}>
//                       {make}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.make && formik.errors.make && (
//                   <Typography color="error" variant="caption">
//                     {formik.errors.make}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Model *</InputLabel>
//                 <Select
//                   label="Model *"
//                   name="model"
//                   value={formik.values.model}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={formik.touched.model && Boolean(formik.errors.model)}
//                 >
//                   {models.map((model) => (
//                     <MenuItem key={model} value={model}>
//                       {model}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {formik.touched.model && formik.errors.model && (
//                   <Typography color="error" variant="caption">
//                     {formik.errors.model}
//                   </Typography>
//                 )}
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Typography gutterBottom>Year *</Typography>
//               <Slider
//                 name="year"
//                 value={formik.values.year}
//                 onChange={(e, value) => formik.setFieldValue('year', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={1}
//                 marks
//                 min={1886}
//                 max={new Date().getFullYear() + 1}
//               />
//               {formik.touched.year && formik.errors.year && (
//                 <Typography color="error" variant="caption">
//                   {formik.errors.year}
//                 </Typography>
//               )}
//             </Grid>
//             <Grid item xs={12} sm={8}>
//               <TextField
//                 fullWidth
//                 label="Trim Level"
//                 name="trimLevel"
//                 value={formik.values.trimLevel}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//             </Grid>

//             {/* Exterior */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Exterior</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Color</Typography>
//               <SketchPicker
//                 color={selectedColor}
//                 onChangeComplete={handleColorChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Body Type</InputLabel>
//                 <Select
//                   label="Body Type"
//                   name="bodyType"
//                   value={formik.values.bodyType}
//                   onChange={formik.handleChange}
//                 >
//                   {bodyTypes.map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Wheel Size (inches)</Typography>
//               <Slider
//                 name="wheelSize"
//                 value={formik.values.wheelSize}
//                 onChange={(e, value) => formik.setFieldValue('wheelSize', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={0.5}
//                 marks
//                 min={14}
//                 max={22}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Number of Doors</InputLabel>
//                 <Select
//                   label="Number of Doors"
//                   name="numberOfDoors"
//                   value={formik.values.numberOfDoors}
//                   onChange={formik.handleChange}
//                 >
//                   {[2, 3, 4, 5].map((doors) => (
//                     <MenuItem key={doors} value={doors}>
//                       {doors}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Engine and Performance */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Engine and Performance</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Engine Type</InputLabel>
//                 <Select
//                   label="Engine Type"
//                   name="engineType"
//                   value={formik.values.engineType}
//                   onChange={formik.handleChange}
//                 >
//                   {['I4', 'V6', 'V8', 'Electric', 'Hybrid'].map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Horsepower</Typography>
//               <Slider
//                 name="horsepower"
//                 value={formik.values.horsepower}
//                 onChange={(e, value) => formik.setFieldValue('horsepower', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={10}
//                 marks
//                 min={50}
//                 max={700}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Torque (lb-ft)</Typography>
//               <Slider
//                 name="torque"
//                 value={formik.values.torque}
//                 onChange={(e, value) => formik.setFieldValue('torque', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={10}
//                 marks
//                 min={50}
//                 max={1000}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Transmission Type</InputLabel>
//                 <Select
//                   label="Transmission Type"
//                   name="transmissionType"
//                   value={formik.values.transmissionType}
//                   onChange={formik.handleChange}
//                 >
//                   {['Automatic', 'Manual'].map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Fuel & Efficiency */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Fuel & Efficiency</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Fuel Type</InputLabel>
//                 <Select
//                   label="Fuel Type"
//                   name="fuelType"
//                   value={formik.values.fuelType}
//                   onChange={formik.handleChange}
//                 >
//                   {['Gasoline', 'Diesel', 'Electric', 'Hybrid'].map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Fuel Economy (City MPG)</Typography>
//               <Slider
//                 name="fuelEconomyCity"
//                 value={formik.values.fuelEconomyCity}
//                 onChange={(e, value) => formik.setFieldValue('fuelEconomyCity', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={1}
//                 marks
//                 min={5}
//                 max={100}
//               />
//               <Typography gutterBottom>Fuel Economy (Highway MPG)</Typography>
//               <Slider
//                 name="fuelEconomyHighway"
//                 value={formik.values.fuelEconomyHighway}
//                 onChange={(e, value) => formik.setFieldValue('fuelEconomyHighway', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={1}
//                 marks
//                 min={5}
//                 max={100}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Tank Capacity (gallons)</Typography>
//               <Slider
//                 name="tankCapacity"
//                 value={formik.values.tankCapacity}
//                 onChange={(e, value) => formik.setFieldValue('tankCapacity', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={1}
//                 marks
//                 min={5}
//                 max={30}
//               />
//             </Grid>

//             {/* Interior & Comfort */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Interior & Comfort</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Seat Material</InputLabel>
//                 <Select
//                   label="Seat Material"
//                   name="seatMaterial"
//                   value={formik.values.seatMaterial}
//                   onChange={formik.handleChange}
//                 >
//                   {['Leather', 'Fabric', 'Vinyl'].map((material) => (
//                     <MenuItem key={material} value={material}>
//                       {material}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Number of Seats</InputLabel>
//                 <Select
//                   label="Number of Seats"
//                   name="numberOfSeats"
//                   value={formik.values.numberOfSeats}
//                   onChange={formik.handleChange}
//                 >
//                   {[2, 4, 5, 7].map((num) => (
//                     <MenuItem key={num} value={num}>
//                       {num}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Infotainment System</Typography>
//               <FormGroup row>
//                 {['Bluetooth', 'Navigation', 'AppleCarPlay'].map((option) => (
//                   <FormControlLabel
//                     key={option}
//                     control={
//                       <Checkbox
//                         checked={infotainmentOptions[option]}
//                         onChange={handleInfotainmentChange}
//                         name={option}
//                       />
//                     }
//                     label={option}
//                   />
//                 ))}
//               </FormGroup>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Air Conditioning</InputLabel>
//                 <Select
//                   label="Air Conditioning"
//                   name="airConditioning"
//                   value={formik.values.airConditioning}
//                   onChange={formik.handleChange}
//                 >
//                   {['Basic', 'Climate Control'].map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Safety Features */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Safety Features</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Airbags</Typography>
//               <FormGroup row>
//                 {['Front', 'Side', 'Curtain'].map((feature) => (
//                   <FormControlLabel
//                     key={feature}
//                     control={
//                       <Checkbox
//                         checked={safetyFeatures[feature]}
//                         onChange={handleSafetyFeaturesChange}
//                         name={feature}
//                       />
//                     }
//                     label={feature}
//                   />
//                 ))}
//               </FormGroup>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={formik.values.abs}
//                     onChange={(e) => formik.setFieldValue('abs', e.target.checked)}
//                     name="abs"
//                   />
//                 }
//                 label="Anti-lock Braking System (ABS)"
//               />
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={formik.values.backupCamera}
//                     onChange={(e) => formik.setFieldValue('backupCamera', e.target.checked)}
//                     name="backupCamera"
//                   />
//                 }
//                 label="Backup Camera"
//               />
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={formik.values.adaptiveCruiseControl}
//                     onChange={(e) =>
//                       formik.setFieldValue('adaptiveCruiseControl', e.target.checked)
//                     }
//                     name="adaptiveCruiseControl"
//                   />
//                 }
//                 label={
//                   <span>
//                     Adaptive Cruise Control
//                     <Tooltip title="Adaptive Cruise Control adjusts your vehicle speed to maintain a safe distance from vehicles ahead.">
//                       <InfoIcon fontSize="small" sx={{ ml: 0.5 }} />
//                     </Tooltip>
//                   </span>
//                 }
//               />
//             </Grid>

//             {/* Additional Features */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Additional Features</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Sunroof</InputLabel>
//                 <Select
//                   label="Sunroof"
//                   name="sunroof"
//                   value={formik.values.sunroof}
//                   onChange={formik.handleChange}
//                 >
//                   {['None', 'Panoramic', 'Standard'].map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Keyless Entry</InputLabel>
//                 <Select
//                   label="Keyless Entry"
//                   name="keylessEntry"
//                   value={formik.values.keylessEntry}
//                   onChange={formik.handleChange}
//                 >
//                   {['None', 'Remote', 'Proximity'].map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Parking Assist</Typography>
//               <FormGroup row>
//                 {['Front', 'Rear', '360'].map((assist) => (
//                   <FormControlLabel
//                     key={assist}
//                     control={
//                       <Checkbox
//                         checked={parkingAssistOptions[assist]}
//                         onChange={handleParkingAssistChange}
//                         name={assist}
//                       />
//                     }
//                     label={assist}
//                   />
//                 ))}
//               </FormGroup>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Climate Package</Typography>
//               <FormGroup row>
//                 {['HeatedSeats', 'HeatedSteeringWheel'].map((feature) => (
//                   <FormControlLabel
//                     key={feature}
//                     control={
//                       <Checkbox
//                         checked={climatePackage[feature]}
//                         onChange={handleClimatePackageChange}
//                         name={feature}
//                       />
//                     }
//                     label={feature}
//                   />
//                 ))}
//               </FormGroup>
//             </Grid>

//             {/* Pricing & Ownership */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Pricing & Ownership</Typography>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Current Market Value ($)</Typography>
//               <Slider
//                 name="currentMarketValue"
//                 value={formik.values.currentMarketValue}
//                 onChange={(e, value) => formik.setFieldValue('currentMarketValue', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={100}
//                 marks
//                 min={1000}
//                 max={100000}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Typography gutterBottom>Mileage (miles)</Typography>
//               <Slider
//                 name="mileage"
//                 value={formik.values.mileage}
//                 onChange={(e, value) => formik.setFieldValue('mileage', value)}
//                 onBlur={formik.handleBlur}
//                 valueLabelDisplay="auto"
//                 step={100}
//                 marks
//                 min={0}
//                 max={300000}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Condition</InputLabel>
//                 <Select
//                   label="Condition"
//                   name="condition"
//                   value={formik.values.condition}
//                   onChange={formik.handleChange}
//                 >
//                   {['New', 'Used', 'Fair', 'Good', 'Excellent'].map((cond) => (
//                     <MenuItem key={cond} value={cond}>
//                       {cond}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={formik.values.accidentHistory}
//                     onChange={(e) => formik.setFieldValue('accidentHistory', e.target.checked)}
//                     name="accidentHistory"
//                   />
//                 }
//                 label="Accident History"
//               />
//               {formik.values.accidentHistory && (
//                 <TextField
//                   fullWidth
//                   label="Accident Details"
//                   name="accidentDetails"
//                   value={formik.values.accidentDetails}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   multiline
//                   rows={3}
//                   margin="normal"
//                 />
//               )}
//             </Grid>

//             {/* Images */}
//             <Grid item xs={12}>
//               <Typography variant="h6">Images</Typography>
//               <Button variant="contained" component="label">
//                 Upload Images
//                 <input
//                   type="file"
//                   hidden
//                   multiple
//                   accept="image/*"
//                   onChange={(event) => {
//                     formik.setFieldValue('images', event.currentTarget.files);
//                   }}
//                 />
//               </Button>
//               <Box mt={2}>
//                 {formik.values.images && formik.values.images.length > 0 && (
//                   <Grid container spacing={2}>
//                     {Array.from(formik.values.images).map((file, index) => (
//                       <Grid item key={index}>
//                         <img
//                           src={URL.createObjectURL(file)}
//                           alt={`Preview ${index + 1}`}
//                           width={100}
//                           height={100}
//                           style={{ objectFit: 'cover', borderRadius: 8 }}
//                         />
//                       </Grid>
//                     ))}
//                   </Grid>
//                 )}
//               </Box>
//             </Grid>

//             {/* Submit Button */}
//             <Grid item xs={12}>
//               {formik.errors.submit && (
//                 <Typography color="error" variant="body2">
//                   {formik.errors.submit}
//                 </Typography>
//               )}
//               <Button
//                 color="primary"
//                 variant="contained"
//                 type="submit"
//                 disabled={formik.isSubmitting}
//               >
//                 {id ? 'Update Car' : 'Add Car'}
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </>
//   );
// };

// export default CarForm;






































// frontend/src/components/Car/CarForm.jsx

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
  Box,
  Toolbar,
  IconButton,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Navbar from '../Navbar'; // Corrected import path
import { useNavigate, useParams } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import InfoIcon from '@mui/icons-material/Info';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

const CarForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // For editing an existing car

  // Define the specific image fields with labels
  const imageFields = [
    { name: 'frontImage', label: 'Front View' },
    { name: 'rearImage', label: 'Rear View' },
    { name: 'sideImage', label: 'Side View' },
    { name: 'interiorImage', label: 'Interior View' },
    { name: 'dashboardImage', label: 'Dashboard View' },
    { name: 'engineImage', label: 'Engine View' },
    { name: 'trunkImage', label: 'Trunk View' },
    { name: 'roofImage', label: 'Roof View' },
    { name: 'wheelImage', label: 'Wheel View' },
    { name: 'otherImage', label: 'Other View' },
  ];

  // Initialize formik with specific image fields
  const formik = useFormik({
    initialValues: {
      // Basic Details
      make: '',
      model: '',
      year: 2020,
      trimLevel: '',

      // Exterior
      color: '#ffffff',
      bodyType: '',
      wheelSize: 18,
      numberOfDoors: 4,

      // Engine and Performance
      engineType: '',
      horsepower: 150,
      torque: 200,
      transmissionType: 'Automatic',

      // Fuel & Efficiency
      fuelType: '',
      fuelEconomyCity: 20,
      fuelEconomyHighway: 30,
      tankCapacity: 15,

      // Interior & Comfort
      seatMaterial: '',
      numberOfSeats: 5,
      infotainmentSystem: [],
      airConditioning: 'Basic',

      // Safety Features
      airbags: [],
      abs: false,
      backupCamera: false,
      adaptiveCruiseControl: false,

      // Additional Features
      sunroof: 'None',
      keylessEntry: 'None',
      parkingAssist: [],
      climatePackage: [],

      // Pricing & Ownership
      currentMarketValue: 20000,
      mileage: 5000,
      condition: '',
      accidentHistory: false,
      accidentDetails: '',

      // Images
      // Initialize each image field to null
      frontImage: null,
      rearImage: null,
      sideImage: null,
      interiorImage: null,
      dashboardImage: null,
      engineImage: null,
      trunkImage: null,
      roofImage: null,
      wheelImage: null,
      otherImage: null,
    },
    validationSchema: Yup.object({
      make: Yup.string().required('Car Make is required'),
      model: Yup.string().required('Car Model is required')
    
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const formData = new FormData();

        // Append all form fields except images
        const {
          frontImage,
          rearImage,
          sideImage,
          interiorImage,
          dashboardImage,
          engineImage,
          trunkImage,
          roofImage,
          wheelImage,
          otherImage,
          ...otherValues
        } = values;

        for (const key in otherValues) {
          if (
            key === 'infotainmentSystem' ||
            key === 'airbags' ||
            key === 'parkingAssist' ||
            key === 'climatePackage'
          ) {
            otherValues[key].forEach((item) => formData.append(`${key}[]`, item));
          } else {
            formData.append(key, otherValues[key]);
          }
        }

        // Append each image with its specific field name
        imageFields.forEach((field) => {
          if (field.name in values && values[field.name]) {
            formData.append(field.name, values[field.name]);
          }
        });

        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };

        if (id) {
          // Update existing car
          await axios.put(`${import.meta.env.VITE_API_URL}/cars/${id}`, formData, config);
        } else {
          // Create new car
          await axios.post(`${import.meta.env.VITE_API_URL}/cars`, formData, config);
        }

        navigate('/dashboard'); // Redirect to dashboard after submission
      } catch (error) {
        console.error('Error submitting form:', error.response);
        setErrors({ submit: error.response?.data?.error || 'An error occurred' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // State hooks
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [bodyTypes] = useState(['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible']);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [infotainmentOptions, setInfotainmentOptions] = useState({
    Bluetooth: false,
    Navigation: false,
    AppleCarPlay: false,
  });
  const [safetyFeatures, setSafetyFeatures] = useState({
    Front: false,
    Side: false,
    Curtain: false,
  });
  const [parkingAssistOptions, setParkingAssistOptions] = useState({
    Front: false,
    Rear: false,
    '360': false,
  });
  const [climatePackageOptions, setClimatePackageOptions] = useState({
    HeatedSeats: false,
    HeatedSteeringWheel: false,
  });

  useEffect(() => {
    // Fetch car makes from an API or define them statically
    // For simplicity, defining them statically here
    const carMakes = ['Toyota', 'Ford', 'BMW', 'Honda', 'Chevrolet'];
    setMakes(carMakes);
  }, []);

  useEffect(() => {
    // Populate models based on selected make
    const carModels = {
      Toyota: ['Corolla', 'Camry', 'RAV4', 'Prius'],
      Ford: ['F-150', 'Mustang', 'Explorer', 'Focus'],
      BMW: ['3 Series', '5 Series', 'X3', 'X5'],
      Honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
      Chevrolet: ['Silverado', 'Malibu', 'Equinox', 'Impala'],
    };

    if (formik.values.make) {
      setModels(carModels[formik.values.make] || []);
      formik.setFieldValue('model', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.make]);

  // Handlers
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    formik.setFieldValue('color', color.hex);
  };

  const handleInfotainmentChange = (event) => {
    const { name, checked } = event.target;
    setInfotainmentOptions((prev) => ({ ...prev, [name]: checked }));
    if (checked) {
      formik.setFieldValue('infotainmentSystem', [...formik.values.infotainmentSystem, name]);
    } else {
      formik.setFieldValue(
        'infotainmentSystem',
        formik.values.infotainmentSystem.filter((item) => item !== name)
      );
    }
  };

  const handleSafetyFeaturesChange = (event) => {
    const { name, checked } = event.target;
    setSafetyFeatures((prev) => ({ ...prev, [name]: checked }));
    if (checked) {
      formik.setFieldValue('airbags', [...formik.values.airbags, name]);
    } else {
      formik.setFieldValue(
        'airbags',
        formik.values.airbags.filter((item) => item !== name)
      );
    }
  };

  const handleParkingAssistChange = (event) => {
    const { name, checked } = event.target;
    setParkingAssistOptions((prev) => ({ ...prev, [name]: checked }));
    if (checked) {
      formik.setFieldValue('parkingAssist', [...formik.values.parkingAssist, name]);
    } else {
      formik.setFieldValue(
        'parkingAssist',
        formik.values.parkingAssist.filter((item) => item !== name)
      );
    }
  };

  const handleClimatePackageChange = (event) => {
    const { name, checked } = event.target;
    setClimatePackageOptions((prev) => ({ ...prev, [name]: checked }));
    if (checked) {
      formik.setFieldValue('climatePackage', [...formik.values.climatePackage, name]);
    } else {
      formik.setFieldValue(
        'climatePackage',
        formik.values.climatePackage.filter((item) => item !== name)
      );
    }
  };

  // Handler for image upload
  const handleImageUpload = (fieldName, file) => {
    formik.setFieldValue(fieldName, file);
  };

  // Handler to remove selected image
  const handleImageRemove = (fieldName) => {
    formik.setFieldValue(fieldName, null);
  };

  return (
    <>
      <Navbar />
      <Toolbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Car' : 'Add New Car'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Details */}
            <Grid item xs={12}>
              <Typography variant="h6">Basic Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Car Make *</InputLabel>
                <Select
                  label="Car Make *"
                  name="make"
                  value={formik.values.make}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.make && Boolean(formik.errors.make)}
                >
                  {makes.map((make) => (
                    <MenuItem key={make} value={make}>
                      {make}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.make && formik.errors.make && (
                  <Typography color="error" variant="caption">
                    {formik.errors.make}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Model *</InputLabel>
                <Select
                  label="Model *"
                  name="model"
                  value={formik.values.model}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.model && Boolean(formik.errors.model)}
                >
                  {models.map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.model && formik.errors.model && (
                  <Typography color="error" variant="caption">
                    {formik.errors.model}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography gutterBottom>Year *</Typography>
              <Slider
                name="year"
                value={formik.values.year}
                onChange={(e, value) => formik.setFieldValue('year', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1886}
                max={new Date().getFullYear() + 1}
              />
              {formik.touched.year && formik.errors.year && (
                <Typography color="error" variant="caption">
                  {formik.errors.year}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Trim Level"
                name="trimLevel"
                value={formik.values.trimLevel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>

            {/* Exterior */}
            <Grid item xs={12}>
              <Typography variant="h6">Exterior</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Color</Typography>
              <SketchPicker
                color={selectedColor}
                onChangeComplete={handleColorChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Body Type</InputLabel>
                <Select
                  label="Body Type"
                  name="bodyType"
                  value={formik.values.bodyType}
                  onChange={formik.handleChange}
                >
                  {bodyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Wheel Size (inches)</Typography>
              <Slider
                name="wheelSize"
                value={formik.values.wheelSize}
                onChange={(e, value) => formik.setFieldValue('wheelSize', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={14}
                max={22}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Number of Doors</InputLabel>
                <Select
                  label="Number of Doors"
                  name="numberOfDoors"
                  value={formik.values.numberOfDoors}
                  onChange={formik.handleChange}
                >
                  {[2, 3, 4, 5].map((doors) => (
                    <MenuItem key={doors} value={doors}>
                      {doors}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Engine and Performance */}
            <Grid item xs={12}>
              <Typography variant="h6">Engine and Performance</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Engine Type</InputLabel>
                <Select
                  label="Engine Type"
                  name="engineType"
                  value={formik.values.engineType}
                  onChange={formik.handleChange}
                >
                  {['I4', 'V6', 'V8', 'Electric', 'Hybrid'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Horsepower</Typography>
              <Slider
                name="horsepower"
                value={formik.values.horsepower}
                onChange={(e, value) => formik.setFieldValue('horsepower', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={50}
                max={700}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Torque (lb-ft)</Typography>
              <Slider
                name="torque"
                value={formik.values.torque}
                onChange={(e, value) => formik.setFieldValue('torque', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={50}
                max={1000}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Transmission Type</InputLabel>
                <Select
                  label="Transmission Type"
                  name="transmissionType"
                  value={formik.values.transmissionType}
                  onChange={formik.handleChange}
                >
                  {['Automatic', 'Manual'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Fuel & Efficiency */}
            <Grid item xs={12}>
              <Typography variant="h6">Fuel & Efficiency</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  label="Fuel Type"
                  name="fuelType"
                  value={formik.values.fuelType}
                  onChange={formik.handleChange}
                >
                  {['Gasoline', 'Diesel', 'Electric', 'Hybrid'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Fuel Economy (City MPG)</Typography>
              <Slider
                name="fuelEconomyCity"
                value={formik.values.fuelEconomyCity}
                onChange={(e, value) => formik.setFieldValue('fuelEconomyCity', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={5}
                max={100}
              />
              <Typography gutterBottom>Fuel Economy (Highway MPG)</Typography>
              <Slider
                name="fuelEconomyHighway"
                value={formik.values.fuelEconomyHighway}
                onChange={(e, value) => formik.setFieldValue('fuelEconomyHighway', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={5}
                max={100}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Tank Capacity (gallons)</Typography>
              <Slider
                name="tankCapacity"
                value={formik.values.tankCapacity}
                onChange={(e, value) => formik.setFieldValue('tankCapacity', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={5}
                max={30}
              />
            </Grid>

            {/* Interior & Comfort */}
            <Grid item xs={12}>
              <Typography variant="h6">Interior & Comfort</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Seat Material</InputLabel>
                <Select
                  label="Seat Material"
                  name="seatMaterial"
                  value={formik.values.seatMaterial}
                  onChange={formik.handleChange}
                >
                  {['Leather', 'Fabric', 'Vinyl'].map((material) => (
                    <MenuItem key={material} value={material}>
                      {material}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Number of Seats</InputLabel>
                <Select
                  label="Number of Seats"
                  name="numberOfSeats"
                  value={formik.values.numberOfSeats}
                  onChange={formik.handleChange}
                >
                  {[2, 4, 5, 7].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Infotainment System</Typography>
              <FormGroup row>
                {['Bluetooth', 'Navigation', 'AppleCarPlay'].map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={infotainmentOptions[option]}
                        onChange={handleInfotainmentChange}
                        name={option}
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Air Conditioning</InputLabel>
                <Select
                  label="Air Conditioning"
                  name="airConditioning"
                  value={formik.values.airConditioning}
                  onChange={formik.handleChange}
                >
                  {['Basic', 'Climate Control'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Safety Features */}
            <Grid item xs={12}>
              <Typography variant="h6">Safety Features</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Airbags</Typography>
              <FormGroup row>
                {['Front', 'Side', 'Curtain'].map((feature) => (
                  <FormControlLabel
                    key={feature}
                    control={
                      <Checkbox
                        checked={safetyFeatures[feature]}
                        onChange={handleSafetyFeaturesChange}
                        name={feature}
                      />
                    }
                    label={feature}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.abs}
                    onChange={(e) => formik.setFieldValue('abs', e.target.checked)}
                    name="abs"
                  />
                }
                label="Anti-lock Braking System (ABS)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.backupCamera}
                    onChange={(e) => formik.setFieldValue('backupCamera', e.target.checked)}
                    name="backupCamera"
                  />
                }
                label="Backup Camera"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.adaptiveCruiseControl}
                    onChange={(e) =>
                      formik.setFieldValue('adaptiveCruiseControl', e.target.checked)
                    }
                    name="adaptiveCruiseControl"
                  />
                }
                label={
                  <span>
                    Adaptive Cruise Control
                    <Tooltip title="Adaptive Cruise Control adjusts your vehicle speed to maintain a safe distance from vehicles ahead.">
                      <InfoIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Tooltip>
                  </span>
                }
              />
            </Grid>

            {/* Additional Features */}
            <Grid item xs={12}>
              <Typography variant="h6">Additional Features</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sunroof</InputLabel>
                <Select
                  label="Sunroof"
                  name="sunroof"
                  value={formik.values.sunroof}
                  onChange={formik.handleChange}
                >
                  {['None', 'Panoramic', 'Standard'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Keyless Entry</InputLabel>
                <Select
                  label="Keyless Entry"
                  name="keylessEntry"
                  value={formik.values.keylessEntry}
                  onChange={formik.handleChange}
                >
                  {['None', 'Remote', 'Proximity'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Parking Assist</Typography>
              <FormGroup row>
                {['Front', 'Rear', '360'].map((assist) => (
                  <FormControlLabel
                    key={assist}
                    control={
                      <Checkbox
                        checked={parkingAssistOptions[assist]}
                        onChange={handleParkingAssistChange}
                        name={assist}
                      />
                    }
                    label={assist}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Climate Package</Typography>
              <FormGroup row>
                {['HeatedSeats', 'HeatedSteeringWheel'].map((feature) => (
                  <FormControlLabel
                    key={feature}
                    control={
                      <Checkbox
                        checked={climatePackageOptions[feature]}
                        onChange={handleClimatePackageChange}
                        name={feature}
                      />
                    }
                    label={feature}
                  />
                ))}
              </FormGroup>
            </Grid>

            {/* Pricing & Ownership */}
            <Grid item xs={12}>
              <Typography variant="h6">Pricing & Ownership</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Current Market Value ($)</Typography>
              <Slider
                name="currentMarketValue"
                value={formik.values.currentMarketValue}
                onChange={(e, value) => formik.setFieldValue('currentMarketValue', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={100}
                marks
                min={1000}
                max={100000}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom>Mileage (miles)</Typography>
              <Slider
                name="mileage"
                value={formik.values.mileage}
                onChange={(e, value) => formik.setFieldValue('mileage', value)}
                onBlur={formik.handleBlur}
                valueLabelDisplay="auto"
                step={100}
                marks
                min={0}
                max={300000}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select
                  label="Condition"
                  name="condition"
                  value={formik.values.condition}
                  onChange={formik.handleChange}
                >
                  {['New', 'Used', 'Fair', 'Good', 'Excellent'].map((cond) => (
                    <MenuItem key={cond} value={cond}>
                      {cond}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.accidentHistory}
                    onChange={(e) => formik.setFieldValue('accidentHistory', e.target.checked)}
                    name="accidentHistory"
                  />
                }
                label="Accident History"
              />
              {formik.values.accidentHistory && (
                <TextField
                  fullWidth
                  label="Accident Details"
                  name="accidentDetails"
                  value={formik.values.accidentDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  multiline
                  rows={3}
                  margin="normal"
                />
              )}
            </Grid>

            {/* Images */}
            <Grid item xs={12}>
              <Typography variant="h6">Images</Typography>
              <Grid container spacing={2}>
                {imageFields.map((field) => (
                  <Grid item xs={12} sm={6} md={4} key={field.name}>
                    <Paper
                      variant="outlined"
                      sx={{
                        padding: 2,
                        textAlign: 'center',
                        position: 'relative',
                        height: 150,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.3s',
                        borderColor: formik.touched[field.name] && formik.errors[field.name] ? 'error.main' : 'grey.300',
                        '&:hover': {
                          borderColor: 'primary.main',
                        },
                      }}
                      onClick={() => document.getElementById(`upload-${field.name}`).click()}
                    >
                      {formik.values[field.name] ? (
                        <Box sx={{ position: 'relative' }}>
                          <img
                            src={URL.createObjectURL(formik.values[field.name])}
                            alt={field.label}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                          />
                          <IconButton
                            size="small"
                            sx={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(255,255,255,0.7)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImageRemove(field.name);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box>
                          <AddPhotoAlternateIcon fontSize="large" color="action" />
                          <Typography variant="body2">{field.label}</Typography>
                        </Box>
                      )}
                      <input
                        type="file"
                        id={`upload-${field.name}`}
                        name={field.name}
                        accept="image/*"
                        hidden
                        onChange={(event) => {
                          if (event.currentTarget.files && event.currentTarget.files[0]) {
                            handleImageUpload(field.name, event.currentTarget.files[0]);
                          }
                        }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              {/* Display validation errors for images */}
              {imageFields.map((field) => (
                <div key={field.name}>
                  {formik.touched[field.name] && formik.errors[field.name] && (
                    <Typography color="error" variant="caption">
                      {formik.errors[field.name]}
                    </Typography>
                  )}
                </div>
              ))}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              {formik.errors.submit && (
                <Typography color="error" variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {id ? 'Update Car' : 'Add Car'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default CarForm;
