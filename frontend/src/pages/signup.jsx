import * as React from 'react';
import { Avatar, Box as MUIBox, Container, CssBaseline, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import logo from '../assets/logo-temp.png';

import TextField from '../components/textfield.jsx';
import Button from '../components/button.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Typography from '../components/typography.jsx';
import Link from '../components/link.jsx';
import Box from '../components/box.jsx';

const Signup = () => {
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
        <Container component="main" maxWidth="sm">
          <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ minHeight: '100vh' }}
            >

            <img src={logo} />

            <Typography variant="title" text="Create An Account" />

            <MUIBox component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                
              <TextField
                required
                name="first_name"
                label="First Name"
                autoFocus
              />

              <TextField
                required
                name="last_name"
                label="Last Name"
                autoFocus
              />

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

              <TextField
                required
                name="repeat-password"
                label="Repeat Password"
                autoFocus
                type="password"
              />

              <Button text="Submit" primary submit fullWidth/>

              <Grid container spacing={2}>
                <Grid item xs={6} alignItem="left" sx={{ marginTop: 2 }}>
                  <Link href="/login" variant="body2" text="Already have an account? Sign In" />
                </Grid>
              </Grid>
            </MUIBox>
          </Grid>
        </Container>
      </Box>
      <Outlet/>
    </>
  );
};

export default Signup;
