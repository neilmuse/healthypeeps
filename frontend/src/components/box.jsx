import React from 'react';
import { Box as MUIBox} from '@mui/material';

const Box = ({ 
  children,
  value
}) => {
  return (
    <MUIBox my={value ? value : 10 }>
      {children}
    </MUIBox>
  );
};

export default Box;
