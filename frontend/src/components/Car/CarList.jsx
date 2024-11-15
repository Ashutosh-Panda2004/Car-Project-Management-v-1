// frontend/src/components/Car/CarList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

function CarList() {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(res.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      // Optionally, handle errors
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-24 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map(car => (
            <div key={car._id} className="bg-white p-4 rounded-md shadow-md">
              {car.images.length > 0 ? (
                <img
                  src={car.images[0]} // Direct URL from Cloudinary
                  alt={car.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <h3 className="text-xl font-semibold mt-4">{car.title}</h3>
              <p className="text-gray-600">{car.description.substring(0, 100)}...</p>
              <Link to={`/cars/${car._id}`} className="text-indigo-600 hover:underline mt-2 inline-block">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CarList;
