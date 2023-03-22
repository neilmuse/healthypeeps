import * as React from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import COLORS from '../constants/colors.js'

import logo from "../assets/logo-temp.png"

import FormTextField from "../components/text-field.jsx";
import OutlinedButton from "../components/button.jsx";
import PictureCard from "../components/picture-card.jsx";
import SimpleText from "../components/simple-text.jsx";
import LinkComponent from "../components/link.jsx";
import GridContainer from '../components/grid-container.jsx';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
          <PictureCard
            height="140"
            image={logo}
            alt="temporary logo"
          />

          <SimpleText variant="title" text="Welcome Back!"/>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <FormTextField
              required
              name="email"
              label="Email Address"
              autoFocus
            />

            <FormTextField
              required
              name="password"
              label="Password"
              autoFocus
              type="password"
            />

            <OutlinedButton text="Sign In"/>

            <Grid container>
              <Grid item xs>
                <LinkComponent href="#" variant="body2" text="Forgot Password?" />
              </Grid>
              <Grid item>
                <LinkComponent href="/signup" variant="body2" text="Don't have an account? Sign Up" />
              </Grid>
            </Grid>
          </Box>
      </Container>
      <Outlet/>
    </>
  );
};

export default Login;