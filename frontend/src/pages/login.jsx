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
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item>
              <img src={logo} />
            </Grid>

            <Grid item>
              <Typography variant="title" text="Welcome Back!" />
            </Grid>

            <Grid item>
              <MUIBox component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                <TextField
                  required
                  name="email"
                  label="Email Address"
                  autoFocus
                  fullWidth
                />

                <TextField
                  required
                  name="password"
                  label="Password"
                  autoFocus
                  type="password"
                  fullWidth
                />

                <Button text="Sign In" primary submit fullWidth />

                <Grid container spacing={2}>
                  <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <LinkComponent href="/reset-password" variant="body2" text="Forgot Password?" />
                  </Grid>
                  <Grid item xs={6} sx={{ marginTop: 2 }}>
                    <LinkComponent href="/signup" variant="body2" text="Don't have an account? Sign Up" />
                  </Grid>
                </Grid>
              </MUIBox>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Outlet />
    </>
  );
};

export default Login;
