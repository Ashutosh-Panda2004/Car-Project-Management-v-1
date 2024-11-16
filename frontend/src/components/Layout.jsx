import React from 'react';
import Navbar from './Navbar';
import { Toolbar } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Toolbar /> {/* Spacer */}
      {children}
    </>
  );
};

export default Layout;
