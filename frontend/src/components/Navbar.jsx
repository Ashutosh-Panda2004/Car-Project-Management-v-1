// // frontend/src/components/Navbar.jsx

// import React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem('token');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <AppBar position="fixed">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
//           Car Management
//         </Typography>
//         {isLoggedIn ? (
//           <>
//             <Button color="inherit" onClick={() => navigate('/dashboard')}>
//               Dashboard
//             </Button>
//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button color="inherit" onClick={() => navigate('/login')}>
//               Login
//             </Button>
//             <Button color="inherit" onClick={() => navigate('/register')}>
//               Register
//             </Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;









import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the home page and reload
    navigate('/');
    window.location.reload(); // Triggers a full page reload
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          CarNexify
        </Typography>
        {isLoggedIn ? (
          <>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
