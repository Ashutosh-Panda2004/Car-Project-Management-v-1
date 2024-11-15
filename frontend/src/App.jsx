// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import Home from './pages/Home';
// import CarForm from './components/Car/CarForm';
// import CarDetail from './components/Car/CarDetail';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';
// import NotFound from './pages/NotFound.jsx';
// import Layout from './components/Layout';

// const App = () => {
//   const isLoggedIn = !!localStorage.getItem('token');

//   return (
//     <Routes>
//       {/* Home Page */}
//       <Route path="/" element={<Home />} />

//       {/* Authentication Routes */}
//       <Route
//         path="/login"
//         element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
//       />
//       <Route
//         path="/register"
//         element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />}
//       />

//       {/* Dashboard */}
//       <Route
//         path="/dashboard"
//         element={
//           isLoggedIn ? (
//             <Layout>
//               <Dashboard />
//             </Layout>
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />

//       {/* Car Routes */}
//       <Route
//         path="/add-car"
//         element={
//           isLoggedIn ? (
//             <Layout>
//               <CarForm />
//             </Layout>
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />
//       <Route
//         path="/cars/:id"
//         element={
//           isLoggedIn ? (
//             <Layout>
//               <CarDetail />
//             </Layout>
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />
//       <Route
//         path="/cars/:id/edit"
//         element={
//           isLoggedIn ? (
//             <Layout>
//               <CarForm />
//             </Layout>
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />

//       {/* Catch-All Route for 404 */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;

















// frontend/src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CarForm from './components/Car/CarForm';
import CarDetail from './components/Car/CarDetail';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import NotFound from './pages/NotFound.jsx';
import Layout from './components/Layout'; // Import Layout

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Routes */}
      <Route
        path="/login"
        element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!isLoggedIn ? <Signup /> : <Navigate to="/dashboard" />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Car Routes */}
      <Route
        path="/add-car"
        element={
          isLoggedIn ? (
            <Layout>
              <CarForm />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/cars/:id"
        element={
          isLoggedIn ? (
            <Layout>
              <CarDetail />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/cars/:id/edit"
        element={
          isLoggedIn ? (
            <Layout>
              <CarForm />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Catch-All Route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
