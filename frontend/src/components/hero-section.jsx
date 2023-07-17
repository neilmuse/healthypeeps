import React from 'react';
import { Box, Typography } from '@mui/material';
import background from '../assets/background-trial.jpg';

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: '50vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Typography
        variant="h2"
        color="white"
        fontWeight="bold"
        sx={{
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          fontSize: {
            xs: '2rem',
            sm: '3rem',
            md: '4rem',
          },
          px: { xs: 2, sm: 0 },
        }}
      >
        Kalusugan sa Bawat Kutsara
      </Typography>
      <Typography
        variant="h6"
        color="white"
        fontWeight="medium"
        sx={{
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          fontSize: {
            xs: '1rem',
            sm: '1.25rem',
            md: '1.5rem',
          },
          px: { xs: 2, sm: 0 },
        }}
      >
        Bawat Kain, Para sa Mahusay na Kinabukasan!
      </Typography>
    </Box>
  );
};

export default HeroSection;
