import React from 'react';
import { Box as MUIBox} from '@mui/material';

const Box = ({ children }) => {
  return (
    <MUIBox my={10}>
      {children}
    </MUIBox>
  );
};

export default Box;
