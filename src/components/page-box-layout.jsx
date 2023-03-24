import React from 'react';
import Box from '@mui/material/Box';

const Layout = ({ children }) => {
  return (
    <Box my={10}>
      {children}
    </Box>
  );
};

export default Layout;
