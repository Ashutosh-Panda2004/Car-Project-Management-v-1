import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Snackbar,
  Alert,
  Toolbar,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Sun, Moon } from 'lucide-react';
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [darkMode, setDarkMode] = useState(true); // Dark mode toggle
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/cars");
        setCars(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error.response);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleDeleteClick = (car) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/cars/${carToDelete._id}`);
      setCars(cars.filter((car) => car._id !== carToDelete._id));
      setDeleteDialogOpen(false);
      setSnackbar({
        open: true,
        message: 'Car deleted successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error deleting car:', error.response);
      setDeleteDialogOpen(false);
      setSnackbar({
        open: true,
        message: 'Failed to delete car. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCarToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Toolbar sx={{ backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
            color: darkMode ? 'white' : 'black',
          }}
        >
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: false,
  };

  const getImageUrl = (car, fieldName) => {
    return car[fieldName] ? car[fieldName] : null;
  };

  return (
    <>
      <Navbar />
     
      <Box sx={{ padding: 4, backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5', color: darkMode ? 'white' : 'black', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            Your Cars
          </Typography>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-800" />}
          </IconButton>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/add-car')}
          sx={{ mb: 3 }}
        >
          Add New Car
        </Button>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? 'white' : 'black' }}>
                <Box sx={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  {(() => {
                    const images = imageFields
                      .filter((field) => getImageUrl(car, field.name))
                      .map((field) => ({
                        src: getImageUrl(car, field.name),
                        label: field.label,
                      }));
                    if (images.length > 0) {
                      return (
                        <Slider {...sliderSettings}>
                          {images.map((image, index) => (
                            <Box key={index} sx={{ position: 'relative' }}>
                              <Box
                                component="img"
                                src={image.src}
                                alt={`${car.make} ${car.model} - ${image.label}`}
                                sx={{
                                  width: '100%',
                                  height: '200px',
                                  objectFit: 'cover',
                                  borderTopLeftRadius: '4px',
                                  borderTopRightRadius: '4px',
                                }}
                                loading="lazy"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/fallback-image.jpg';
                                }}
                              />
                              <Box
                                sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                  color: 'white',
                                  padding: '4px',
                                  textAlign: 'center',
                                  borderBottomLeftRadius: '4px',
                                  borderBottomRightRadius: '4px',
                                }}
                              >
                                <Typography variant="caption">{image.label}</Typography>
                              </Box>
                            </Box>
                          ))}
                        </Slider>
                      );
                    } else {
                      return (
                        <Box
                          sx={{
                            width: '100%',
                            height: '200px',
                            backgroundColor: darkMode ? '#555' : '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopLeftRadius: '4px',
                            borderTopRightRadius: '4px',
                          }}
                        >
                          <Typography>No Images Available</Typography>
                        </Box>
                      );
                    }
                  })()}
                </Box>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {car.make} {car.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: darkMode ? '#ddd' : 'inherit' }}>
                    Year: {car.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: darkMode ? '#ddd' : 'inherit' }}>
                    Mileage: {car.mileage.toLocaleString()} miles
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ color: darkMode ? '#ddd' : 'inherit' }}>
                    Condition: {car.condition || 'N/A'}
                  </Typography>
                </CardContent>

                <CardActions sx={{ mt: 'auto' }}>
                  <Button size="small" onClick={() => navigate(`/cars/${car._id}`)}>
                    View Details
                  </Button>
                  <Button size="small" onClick={() => navigate(`/cars/${car._id}/edit`)}>
                    Edit
                  </Button>
                  <Tooltip title="Delete Car">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteClick(car)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? 'white' : 'black',
          },
        }}
      >
        <DialogTitle id="delete-dialog-title">Delete Car</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description" style={{ color: darkMode ? '#ccc' : 'inherit' }}>
            Are you sure you want to delete the car "{carToDelete?.make} {carToDelete?.model}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;
