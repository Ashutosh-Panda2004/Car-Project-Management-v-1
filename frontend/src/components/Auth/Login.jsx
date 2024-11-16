import React, { useState } from 'react';
import Navbar from '../Navbar';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react'; // Import Sun and Moon icons

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [darkMode, setDarkMode] = useState(true); // Dark mode toggle
  const navigate = useNavigate();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied to clipboard: ${text}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/auth/login', {
        email,
        password,
      });

      // Save the token to localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to the dashboard and reload the page
      navigate('/');
      window.location.reload(); // Triggers a full page reload
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data.errors) {
        // Validation errors from the backend
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.data.error) {
        // Other errors from the backend
        setErrors([{ msg: error.response.data.error }]);
      } else {
        setErrors([{ msg: 'An error occurred during login.' }]);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className={`min-h-screen flex justify-center items-center ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        <div className="absolute top-4 right-4 mt-20">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full focus:outline-none"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" /> // Sun icon for dark mode
            ) : (
              <Moon className="w-6 h-6 text-gray-800" /> // Moon icon for light mode
            )}
          </button>
        </div>

        <form
          className={`max-w-md w-full p-8 rounded-md shadow-md ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
          onSubmit={submitHandler}
        >
          <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Login
          </h2>
          <div
            className={`mb-6 p-4 rounded-md ${
              darkMode ? 'bg-indigo-700 text-white' : 'bg-indigo-200 text-indigo-900'
            }`}
          >
            <h3 className="text-lg font-bold mb-2">
              Wanna explore this website? Use these test credentials!
            </h3>
            <div className="flex justify-between items-center mb-2">
              <p>
                <strong>Email:</strong> <span className="font-mono">test@gmail.com</span>
              </p>
              <button
                type="button"
                onClick={() => handleCopy('test@gmail.com')}
                className={`text-sm px-2 py-1 rounded-md ${
                  darkMode
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-indigo-500 hover:bg-indigo-400 text-white'
                }`}
              >
                Copy Email
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p>
                <strong>Password:</strong> <span className="font-mono">test1234</span>
              </p>
              <button
                type="button"
                onClick={() => handleCopy('test1234')}
                className={`text-sm px-2 py-1 rounded-md ${
                  darkMode
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-indigo-500 hover:bg-indigo-400 text-white'
                }`}
              >
                Copy Password
              </button>
            </div>
          </div>
          {errors.length > 0 && (
            <div className="mb-4 text-red-600">
              {errors.map((error, index) => (
                <p key={index}>{error.msg}</p>
              ))}
            </div>
          )}
          <div className="mb-4">
            <label
              className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Email *
            </label>
            <input
              type="email"
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring ${
                darkMode ? 'focus:ring-indigo-600 bg-gray-700 text-white' : 'focus:ring-indigo-200'
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Password *
            </label>
            <input
              type="password"
              className={`border p-3 w-full rounded-md focus:outline-none focus:ring ${
                darkMode ? 'focus:ring-indigo-600 bg-gray-700 text-white' : 'focus:ring-indigo-200'
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`${
              darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white px-6 py-3 rounded-md w-full transition-colors duration-300`}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
