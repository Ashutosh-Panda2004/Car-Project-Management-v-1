// // frontend/src/api/axiosConfig.js
// import axios from 'axios';

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export default instance;





























// // frontend/src/api/axiosConfig.js

// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // e.g., http://localhost:5000/api
//   headers: {
//     'Content-Type': 'multipart/form-data', // Necessary for form submissions with files
//   },
// });

// // ... (interceptors if any)

// export default axiosInstance;




















// // frontend/src/api/axiosConfig.js

// import axios from 'axios';

// // Create an Axios instance with the base URL from the environment variable
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Ensure no trailing slash
//   // Do not set 'Content-Type' here; let Axios handle it based on request data
// });

// // Add a request interceptor to include the JWT token in headers if available
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Ensure 'token' is the correct key
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
//     }
//     return config;
//   },
//   (error) => Promise.reject(error) // Handle request errors
// );

// export default axiosInstance;








// frontend/src/api/axiosConfig.js

import axios from 'axios';

// Create an Axios instance with the base URL from the environment variable
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Ensure no trailing slash
  // Do not set 'Content-Type' here; let Axios handle it based on request data
});

// Add a request interceptor to include the JWT token in headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Ensure 'token' is the correct key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add a response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
