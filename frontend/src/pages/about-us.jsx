import * as React from 'react';
import { Grid as MUIGrid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import developer from '../assets/mae.jpg'
import logo from '../assets/logo-temp.png'

import CardMedia from '../components/cardmedia.jsx';
import Typography from '../components/typography.jsx';
import Box from '../components/box.jsx';

const AboutUs = () => {
  return (
    <>
      <Box>
        <MUIGrid container direction="row" justifyContent="space-evenly" spacing={10}>
          <MUIGrid item xs={12} sm={6} lg={4}>
              <CardMedia
                height="140"
                image={logo}
                alt="temporary logo"
                fixed
              />
              <Typography variant="title" text="About Us"/>
              <Typography variant="body1" text="HealthyPeeps aims to address the issue of health concerns by focusing on health and nutrition. Our goal is to provide content tailored for Filipinos, encourage people to start a healthy lifestyle, and provide a platform for fruitful discussions and collaborations." />
          </MUIGrid>
          <MUIGrid item xs={12} sm={6} lg={4}>
              <CardMedia
                height="140"
                image={developer}
                alt="temporary logo"
                fixed
              />
              <Typography variant="title" text="About the Developer"/>
              <Typography variant="body1" text="Crisneil Musa is a senior student studying BS Computer Science
              at the University of the Philippines - Los Banos."/>
          </MUIGrid>
        </MUIGrid>
      </Box>
      <Outlet/>
    </>
  );
};

export default AboutUs;
