// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
// import { Moon, Sun, Car, Image, Search, Tag } from 'lucide-react';

// const Home = () => {
//   const [darkMode, setDarkMode] = useState(true);
//   const navigate = useNavigate();

//   const isLoggedIn = !!localStorage.getItem('token');

//   const handleLogout = () => {
//     // Remove the token from localStorage
//     localStorage.removeItem('token');

//     // Redirect to the home page and reload
//     navigate('/');
//     window.location.reload(); // Triggers a full page reload
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
//       {/* Unified Navbar */}
//       <AppBar position="fixed" className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
//         <Toolbar className="flex justify-between">
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, cursor: 'pointer' }}
//             onClick={() => navigate('/')}
//             className={`${darkMode ? 'text-white' : 'text-gray-900'}`}
//           >
//             CarNexify
//           </Typography>
//           <div className="flex space-x-2">
//             {isLoggedIn ? (
//               <>
//                 <Button color="inherit" onClick={() => navigate('/dashboard')}>
//                   Dashboard
//                 </Button>
//                 <Button color="inherit" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" onClick={() => navigate('/login')}>
//                   Login
//                 </Button>
//                 <Button color="inherit" onClick={() => navigate('/register')}>
//                   Register
//                 </Button>
//               </>
//             )}
//             <IconButton
//               onClick={() => setDarkMode(!darkMode)}
//               className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
//             >
//               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-6">
//         <div className="container mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Revolutionary Car Management System</h1>
//           <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-80">
//             Streamline your automotive inventory with our powerful platform. Upload, manage, and organize your car collection with ease.
//           </p>
//           <button
//             onClick={() => navigate('/signup')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
//           >
//             Start Managing Cars
//           </button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section py-20 px-6">
//         <div className="container mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powerful Features</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 icon: <Image className="w-12 h-12 text-blue-600" />,
//                 title: "Multi-Image Support",
//                 description: "Upload up to 10 high-quality images for each car listing"
//               },
//               {
//                 icon: <Tag className="w-12 h-12 text-blue-600" />,
//                 title: "Smart Tagging",
//                 description: "Organize cars by type, company, dealer, and custom tags"
//               },
//               {
//                 icon: <Search className="w-12 h-12 text-blue-600" />,
//                 title: "Global Search",
//                 description: "Find cars instantly with our powerful search functionality"
//               }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className={`feature-card p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-xl transition-all duration-300`}
//               >
//                 <div className="mb-6">{feature.icon}</div>
//                 <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
//                 <p className="opacity-80">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className={`stats-section py-20 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
//             {[
//               { number: "10+", label: "Images per Car" },
//               { number: "Unlimited", label: "Car Listings" },
//               { number: "Real-time", label: "Search" },
//               { number: "Secure", label: "Authentication" }
//             ].map((stat, index) => (
//               <div key={index} className={`stat-item`}>
//                 <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
//                 <div className="text-lg opacity-80">{stat.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
//         <div className="container mx-auto px-6 text-center">
//           <div className="flex justify-center items-center space-x-4 mb-4">
//             <Car className="w-6 h-6 text-blue-600" />
//             <span className="text-xl font-semibold">CarNexify</span>
//           </div>
//           <p className="opacity-80">
//             &copy; {new Date().getFullYear()} CarNexify. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;











import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Moon, Sun, Car, Image, Search, Tag } from 'lucide-react';

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Unified Navbar */}
      <AppBar position="fixed" className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <Toolbar className="flex justify-between">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
            className={`${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            CarNexify
          </Typography>
          <div className="flex space-x-2">
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
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Revolutionary Car Management System</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-80">
            Streamline your automotive inventory with our powerful platform. Upload, manage, and organize your car collection with ease.
          </p>
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate('/dashboard');  // If logged in, navigate to dashboard
              } else {
                navigate('/login');  // If not logged in, navigate to login page
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            {isLoggedIn ? 'Start Managing Cars' : 'Login to Manage Cars'} {/* Change button text based on login state */}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Image className="w-12 h-12 text-blue-600" />,
                title: "Multi-Image Support",
                description: "Upload up to 10 high-quality images for each car listing"
              },
              {
                icon: <Tag className="w-12 h-12 text-blue-600" />,
                title: "Smart Tagging",
                description: "Organize cars by type, company, dealer, and custom tags"
              },
              {
                icon: <Search className="w-12 h-12 text-blue-600" />,
                title: "Global Search",
                description: "Find cars instantly with our powerful search functionality"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`feature-card p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-xl transition-all duration-300`}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`stats-section py-20 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Images per Car" },
              { number: "Unlimited", label: "Car Listings" },
              { number: "Real-time", label: "Search" },
              { number: "Secure", label: "Authentication" }
            ].map((stat, index) => (
              <div key={index} className={`stat-item`}>
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-lg opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Car className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold">CarNexify</span>
          </div>
          <p className="opacity-80">
            &copy; {new Date().getFullYear()} CarNexify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
