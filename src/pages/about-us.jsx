import * as React from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import COLORS from '../constants/colors.js'

import developer from "../assets/mae.jpg"
import logo from "../assets/logo-temp.png"

import FormTextField from "../components/text-field.jsx";
import OutlinedButton from "../components/button.jsx";
import PictureCard from "../components/picture-card.jsx";
import SimpleText from "../components/simple-text.jsx";
import LinkComponent from "../components/link.jsx";
import GridContainer from '../components/grid-container.jsx';
import CardComponent from '../components/card-component.jsx';

const AboutUs = () => {
  return (
    <>
      <Grid container direction="row" justifyContent="space-evenly" spacing={10}>
        <Grid item xs={12} md={6} lg={4}>
            <PictureCard
              height="140"
              image={logo}
              alt="temporary logo"
            />
            <SimpleText variant="title" text="About Us"/>
            <SimpleText variant="body1" text="HealthyPeeps aims to address the issue of health concerns by focusing on health and nutrition. Our goal is to provide content tailored for Filipinos, encourage people to start a healthy lifestyle, and provide a platform for fruitful discussions and collaborations." />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
            <PictureCard
              height="140"
              image={developer}
              alt="temporary logo"
            />
            <SimpleText variant="title" text="About the Developer"/>
            <SimpleText variant="body1" text="Crisneil Musa is a senior student studying BS Computer Science
            at the University of the Philippines - Los Banos."/>
        </Grid>
      </Grid>
      <Outlet/>
    </>
  );
};

export default AboutUs;