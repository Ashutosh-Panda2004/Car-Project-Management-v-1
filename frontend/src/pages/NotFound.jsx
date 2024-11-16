import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import Navbar from '../components/Navbar'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar'; // Import Toolbar for spacer

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to Home or any other desired route
  };

  return (
    <>
      <Navbar />
      <Toolbar /> {/* Spacer to push content below Navbar */}
      <Box
        sx={{
          minHeight: '80vh', // Ensures the box takes up enough vertical space
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ mt: 3 }}
        >
          Go to Home
        </Button>
      </Box>
    </>
  );
};

export default NotFound;
