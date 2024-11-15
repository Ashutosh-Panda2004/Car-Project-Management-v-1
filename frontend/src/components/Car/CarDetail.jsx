// // frontend/src/components/Car/CarDetail.jsx

// import React, { useEffect, useState } from 'react';
// import {
//   Typography,
//   Box,
//   Grid,
//   Button,
//   Card,
//   CardMedia,
//   CardContent,
//   CircularProgress,
//   Chip,
//   Divider,
//   Paper,
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../../api/axiosConfig'; // Use the configured Axios instance
// import Navbar from '../Navbar';
// import Toolbar from '@mui/material/Toolbar'; // Import Toolbar for spacer
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from 'recharts';
// import InfoIcon from '@mui/icons-material/Info';

// const CarDetail = () => {
//   const { id } = useParams(); // Extract car ID from URL
//   const navigate = useNavigate();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Define the specific image fields with labels
//   const imageFields = [
//     { name: 'frontImage', label: 'Front View' },
//     { name: 'rearImage', label: 'Rear View' },
//     { name: 'sideImage', label: 'Side View' },
//     { name: 'interiorImage', label: 'Interior View' },
//     { name: 'dashboardImage', label: 'Dashboard View' },
//     { name: 'engineImage', label: 'Engine View' },
//     { name: 'trunkImage', label: 'Trunk View' },
//     { name: 'roofImage', label: 'Roof View' },
//     { name: 'wheelImage', label: 'Wheel View' },
//     { name: 'otherImage', label: 'Other View' },
//   ];

//   // Mock average metrics data
//   const averageMetrics = {
//     mileage: 30000, // Average mileage in miles
//     horsepower: 200, // Average horsepower
//     torque: 250, // Average torque in lb-ft
//     fuelEconomyCity: 25, // Average city MPG
//     fuelEconomyHighway: 35, // Average highway MPG
//     currentMarketValue: 25000, // Average market value in USD
//   };

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await axios.get(`/cars/${id}`); // Corrected endpoint
//         setCar(response.data);
//       } catch (err) {
//         console.error('Error fetching car:', err.response);
//         setError(err.response?.data?.error || 'Failed to fetch car details.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [id]);

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <Toolbar /> {/* Spacer to push content below Navbar */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '80vh',
//           }}
//         >
//           <CircularProgress />
//         </Box>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <Navbar />
//         <Toolbar /> {/* Spacer to push content below Navbar */}
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '80vh',
//             textAlign: 'center',
//             padding: 2,
//           }}
//         >
//           <Typography variant="h5" color="error" gutterBottom>
//             {error}
//           </Typography>
//           <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
//             Back to Dashboard
//           </Button>
//         </Box>
//       </>
//     );
//   }

//   // Prepare data for charts
//   const chartData = [
//     {
//       name: 'Mileage',
//       'Your Car': car.mileage,
//       Average: averageMetrics.mileage,
//     },
//     {
//       name: 'Horsepower',
//       'Your Car': car.horsepower,
//       Average: averageMetrics.horsepower,
//     },
//     {
//       name: 'Torque',
//       'Your Car': car.torque,
//       Average: averageMetrics.torque,
//     },
//     {
//       name: 'Fuel Economy (City)',
//       'Your Car': car.fuelEconomyCity,
//       Average: averageMetrics.fuelEconomyCity,
//     },
//     {
//       name: 'Fuel Economy (Highway)',
//       'Your Car': car.fuelEconomyHighway,
//       Average: averageMetrics.fuelEconomyHighway,
//     },
//     {
//       name: 'Market Value',
//       'Your Car': car.currentMarketValue,
//       Average: averageMetrics.currentMarketValue,
//     },
//   ];

//   // Radar chart data
//   const radarData = [
//     {
//       metric: 'Mileage',
//       'Your Car': car.mileage,
//       Average: averageMetrics.mileage,
//     },
//     {
//       metric: 'Horsepower',
//       'Your Car': car.horsepower,
//       Average: averageMetrics.horsepower,
//     },
//     {
//       metric: 'Torque',
//       'Your Car': car.torque,
//       Average: averageMetrics.torque,
//     },
//     {
//       metric: 'Fuel Economy (City)',
//       'Your Car': car.fuelEconomyCity,
//       Average: averageMetrics.fuelEconomyCity,
//     },
//     {
//       metric: 'Fuel Economy (Highway)',
//       'Your Car': car.fuelEconomyHighway,
//       Average: averageMetrics.fuelEconomyHighway,
//     },
//     {
//       metric: 'Market Value',
//       'Your Car': car.currentMarketValue,
//       Average: averageMetrics.currentMarketValue,
//     },
//   ];

//   // Function to safely get image URL
//   const getImageUrl = (fieldName) => {
//     return car[fieldName] ? car[fieldName] : null;
//   };

//   return (
//     <>
//       <Navbar />
//       <Toolbar /> {/* Spacer to push content below Navbar */}
//       <Box sx={{ padding: 4 }}>
//         <Grid container spacing={4}>
//           {/* Car Images */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               Car Images
//             </Typography>
//             <Grid container spacing={2}>
//               {imageFields.map((field) => (
//                 <Grid item xs={12} sm={6} key={field.name}>
//                   {getImageUrl(field.name) ? (
//                     <Card>
//                       <CardMedia
//                         component="img"
//                         height="200"
//                         image={getImageUrl(field.name)}
//                         alt={`${car.make} ${car.model} - ${field.label}`}
//                         sx={{ objectFit: 'cover' }}
//                       />
//                       <CardContent>
//                         <Typography variant="body2" color="text.secondary">
//                           {field.label}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   ) : (
//                     <Paper
//                       elevation={3}
//                       sx={{
//                         height: 200,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: '#f5f5f5',
//                       }}
//                     >
//                       <Typography variant="body2" color="text.secondary">
//                         {field.label} Not Available
//                       </Typography>
//                     </Paper>
//                   )}
//                 </Grid>
//               ))}
//             </Grid>
//           </Grid>

//           {/* Car Details */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h4" gutterBottom>
//               {car.make} {car.model}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Year:</strong> {car.year}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Trim Level:</strong> {car.trimLevel || 'N/A'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Color:</strong>{' '}
//               <Box
//                 component="span"
//                 sx={{
//                   backgroundColor: car.color,
//                   width: 20,
//                   height: 20,
//                   display: 'inline-block',
//                   borderRadius: '50%',
//                   ml: 1,
//                   verticalAlign: 'middle',
//                   border: '1px solid #000',
//                 }}
//               ></Box>{' '}
//               {car.color}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Body Type:</strong> {car.bodyType || 'N/A'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Wheel Size:</strong> {car.wheelSize}" wheels
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Number of Doors:</strong> {car.numberOfDoors}
//             </Typography>
//             <Divider sx={{ my: 2 }} />

//             {/* Engine and Performance */}
//             <Typography variant="h6" gutterBottom>
//               Engine and Performance
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Engine Type:</strong> {car.engineType || 'N/A'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Horsepower:</strong> {car.horsepower} HP
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Torque:</strong> {car.torque} lb-ft
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Transmission:</strong> {car.transmissionType}
//             </Typography>
//             <Divider sx={{ my: 2 }} />

//             {/* Fuel & Efficiency */}
//             <Typography variant="h6" gutterBottom>
//               Fuel & Efficiency
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Fuel Type:</strong> {car.fuelType || 'N/A'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Fuel Economy (City):</strong> {car.fuelEconomyCity} MPG
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Fuel Economy (Highway):</strong> {car.fuelEconomyHighway} MPG
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Tank Capacity:</strong> {car.tankCapacity} gallons
//             </Typography>
//             <Divider sx={{ my: 2 }} />

//             {/* Interior & Comfort */}
//             <Typography variant="h6" gutterBottom>
//               Interior & Comfort
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Seat Material:</strong> {car.seatMaterial || 'N/A'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Number of Seats:</strong> {car.numberOfSeats}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Infotainment System:</strong>{' '}
//               {car.infotainmentSystem.length > 0 ? car.infotainmentSystem.join(', ') : 'None'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Air Conditioning:</strong> {car.airConditioning}
//             </Typography>
//             <Divider sx={{ my: 2 }} />

//             {/* Safety Features */}
//             <Typography variant="h6" gutterBottom>
//               Safety Features
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Airbags:</strong> {car.airbags.length > 0 ? car.airbags.join(', ') : 'None'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>ABS:</strong> {car.abs ? 'Enabled' : 'Disabled'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Backup Camera:</strong> {car.backupCamera ? 'Yes' : 'No'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Adaptive Cruise Control:</strong> {car.adaptiveCruiseControl ? 'Yes' : 'No'}
//             </Typography>
//             <Divider sx={{ my: 2 }} />

//             {/* Additional Features */}
//             <Typography variant="h6" gutterBottom>
//               Additional Features
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Sunroof:</strong> {car.sunroof}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Keyless Entry:</strong> {car.keylessEntry}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Parking Assist:</strong>{' '}
//               {car.parkingAssist.length > 0 ? car.parkingAssist.join(', ') : 'None'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Climate Package:</strong>{' '}
//               {car.climatePackage.length > 0 ? car.climatePackage.join(', ') : 'None'}
//             </Typography>
//             <Divider sx={{ my: 2 }} />

//             {/* Pricing & Ownership */}
//             <Typography variant="h6" gutterBottom>
//               Pricing & Ownership
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Current Market Value:</strong> ${car.currentMarketValue.toLocaleString()}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Mileage:</strong> {car.mileage.toLocaleString()} miles
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Condition:</strong> {car.condition || 'N/A'}
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//               <strong>Accident History:</strong>{' '}
//               {car.accidentHistory ? `Yes - ${car.accidentDetails}` : 'No'}
//             </Typography>
//             <Divider sx={{ my: 2 }} />

//             {/* Graphical Analysis */}
//             <Typography variant="h6" gutterBottom>
//               Analytical Insights
//             </Typography>

//             <Grid container spacing={4}>
//               {/* Mileage Comparison Bar Chart */}
//               <Grid item xs={12} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Mileage Comparison
//                   </Typography>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart data={chartData.slice(0, 1)}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="Your Car" fill="#8884d8" />
//                       <Bar dataKey="Average" fill="#82ca9d" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </Paper>
//               </Grid>

//               {/* Horsepower Comparison Bar Chart */}
//               <Grid item xs={12} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Horsepower Comparison
//                   </Typography>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart data={chartData.slice(1, 2)}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="Your Car" fill="#ff7300" />
//                       <Bar dataKey="Average" fill="#387908" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </Paper>
//               </Grid>

//               {/* Fuel Economy Comparison Bar Chart */}
//               <Grid item xs={12} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Fuel Economy Comparison
//                   </Typography>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart data={chartData.slice(3, 5)}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="Your Car" fill="#413ea0" />
//                       <Bar dataKey="Average" fill="#ffbb28" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </Paper>
//               </Grid>

//               {/* Torque Comparison Bar Chart */}
//               <Grid item xs={12} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Torque Comparison
//                   </Typography>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart data={chartData.slice(2, 3)}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="Your Car" fill="#82ca9d" />
//                       <Bar dataKey="Average" fill="#8884d8" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </Paper>
//               </Grid>

//               {/* Market Value Comparison Bar Chart */}
//               <Grid item xs={12} md={6}>
//                 <Paper elevation={3} sx={{ padding: 2 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Market Value Comparison
//                   </Typography>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart data={chartData.slice(5, 6)}>
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey="Your Car" fill="#d0ed57" />
//                       <Bar dataKey="Average" fill="#a4de6c" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </Paper>
//               </Grid>
//             </Grid>

//             {/* Radar Chart for Comprehensive Comparison */}
//             <Box sx={{ mt: 4 }}>
//               <Paper elevation={3} sx={{ padding: 2 }}>
//                 <Typography variant="subtitle1" gutterBottom>
//                   Comprehensive Performance Analysis
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={400}>
//                   <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
//                     <PolarGrid />
//                     <PolarAngleAxis dataKey="metric" />
//                     <PolarRadiusAxis angle={30} domain={[0, Math.max(...radarData.map(item => Math.max(item['Your Car'], item['Average'])))]} />
//                     <Radar
//                       name="Your Car"
//                       dataKey="Your Car"
//                       stroke="#8884d8"
//                       fill="#8884d8"
//                       fillOpacity={0.6}
//                     />
//                     <Radar
//                       name="Average"
//                       dataKey="Average"
//                       stroke="#82ca9d"
//                       fill="#82ca9d"
//                       fillOpacity={0.6}
//                     />
//                     <Legend />
//                     <Tooltip />
//                   </RadarChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Box>

//             {/* Back Button */}
//             <Box sx={{ mt: 4 }}>
//               <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
//                 Back to Dashboard
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default CarDetail;









import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Divider,
  Paper,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import Navbar from '../Navbar';
import Toolbar from '@mui/material/Toolbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const averageMetrics = {
    mileage: 30000,
    horsepower: 200,
    torque: 250,
    fuelEconomyCity: 25,
    fuelEconomyHighway: 35,
    currentMarketValue: 25000,
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        console.error('Error fetching car:', err.response);
        setError(err.response?.data?.error || 'Failed to fetch car details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={darkTheme}>
        <Navbar />
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            textAlign: 'center',
            padding: 2,
            bgcolor: 'background.default',
            color: 'text.primary',
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Box>
      </ThemeProvider>
    );
  }

  const chartData = [
    { name: 'Mileage', 'Your Car': car.mileage, Average: averageMetrics.mileage },
    { name: 'Horsepower', 'Your Car': car.horsepower, Average: averageMetrics.horsepower },
    { name: 'Torque', 'Your Car': car.torque, Average: averageMetrics.torque },
    { name: 'Fuel Economy (City)', 'Your Car': car.fuelEconomyCity, Average: averageMetrics.fuelEconomyCity },
    { name: 'Fuel Economy (Highway)', 'Your Car': car.fuelEconomyHighway, Average: averageMetrics.fuelEconomyHighway },
    { name: 'Market Value', 'Your Car': car.currentMarketValue, Average: averageMetrics.currentMarketValue },
  ];

  const radarData = [
    { metric: 'Mileage', 'Your Car': car.mileage, Average: averageMetrics.mileage },
    { metric: 'Horsepower', 'Your Car': car.horsepower, Average: averageMetrics.horsepower },
    { metric: 'Torque', 'Your Car': car.torque, Average: averageMetrics.torque },
    { metric: 'Fuel Economy (City)', 'Your Car': car.fuelEconomyCity, Average: averageMetrics.fuelEconomyCity },
    { metric: 'Fuel Economy (Highway)', 'Your Car': car.fuelEconomyHighway, Average: averageMetrics.fuelEconomyHighway },
    { metric: 'Market Value', 'Your Car': car.currentMarketValue, Average: averageMetrics.currentMarketValue },
  ];

  const getImageUrl = (fieldName) => car[fieldName] || null;

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <Box sx={{ padding: 4, bgcolor: 'background.default', color: 'text.primary' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Car Images</Typography>
            <Grid container spacing={2}>
              {imageFields.map((field) => (
                <Grid item xs={12} sm={6} key={field.name}>
                  {getImageUrl(field.name) ? (
                    <Card sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={getImageUrl(field.name)}
                        alt={`${car.make} ${car.model} - ${field.label}`}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {field.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    <Paper
                      elevation={3}
                      sx={{
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {field.label} Not Available
                      </Typography>
                    </Paper>
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Car Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {car.make} {car.model}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Year:</strong> {car.year}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Trim Level:</strong> {car.trimLevel || 'N/A'}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Color:</strong> <Box component="span" sx={{ backgroundColor: car.color, width: 20, height: 20, borderRadius: '50%', ml: 1 }}></Box> {car.color}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Body Type:</strong> {car.bodyType || 'N/A'}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Wheel Size:</strong> {car.wheelSize}" wheels
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Number of Doors:</strong> {car.numberOfDoors}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* Engine and Performance */}
            <Typography variant="h6" gutterBottom>Engine and Performance</Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Engine Type:</strong> {car.engineType || 'N/A'}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Horsepower:</strong> {car.horsepower} HP
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Torque:</strong> {car.torque} lb-ft
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Transmission:</strong> {car.transmissionType}
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* Fuel & Efficiency */}
            <Typography variant="h6" gutterBottom>Fuel & Efficiency</Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Fuel Type:</strong> {car.fuelType || 'N/A'}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Fuel Economy (City):</strong> {car.fuelEconomyCity} MPG
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Fuel Economy (Highway):</strong> {car.fuelEconomyHighway} MPG
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Tank Size:</strong> {car.tankSize || 'N/A'} gallons
            </Typography>
            <Divider sx={{ my: 2 }} />

            {/* Performance Comparison */}
            <Typography variant="h6" gutterBottom>Performance Comparison</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Your Car" fill="#8884d8" />
                  <Bar dataKey="Average" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Divider sx={{ my: 2 }} />

            {/* Radar Comparison */}
            <Typography variant="h6" gutterBottom>Radar Comparison</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
                  <Radar name="Your Car" dataKey="Your Car" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Average" dataKey="Average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default CarDetail;
