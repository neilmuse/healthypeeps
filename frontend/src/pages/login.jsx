import * as React from 'react';
import { Box as MUIBox, Container, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import logo from '../assets/logo-temp.png'

import TextField from '../components/textfield.jsx';
import Button from '../components/button.jsx';
import Typography from '../components/typography.jsx';
import LinkComponent from '../components/link.jsx';
import Box from '../components/box.jsx';

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
      <Box>
        <Container maxWidth="sm">

            <img src={logo} />

            <Typography variant="title" text="Welcome Back!"/>

            <MUIBox component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

              <TextField
                required
                name="email"
                label="Email Address"
                autoFocus
              />

              <TextField
                required
                name="password"
                label="Password"
                autoFocus
                type="password"
              />

              <Button text="Sign In" primary submit/>

              <Grid container>
                <Grid item xs>
                  <LinkComponent href="#" variant="body2" text="Forgot Password?" />
                </Grid>
                <Grid item>
                  <LinkComponent href="/signup" variant="body2" text="Don't have an account? Sign Up" />
                </Grid>
              </Grid>
            </MUIBox>
        </Container>
      </Box>
      <Outlet/>
    </>
  );
};

export default Login;