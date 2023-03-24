import * as React from 'react';
import { Avatar, Box, CardMedia, Container, CssBaseline, Grid, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import logo from "../assets/logo-temp.png";

import FormTextField from "../components/text-field.jsx";
import OutlinedButton from "../components/button.jsx";
import PictureCard from "../components/picture-card.jsx";
import SimpleText from "../components/simple-text.jsx";
import LinkComponent from "../components/link.jsx";
import PageLayout from '../components/page-box-layout.jsx';

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
      <PageLayout>
        <Container component="main" maxWidth="sm">

          <img src={logo} />

          <SimpleText variant="title" text="Create An Account" />

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              
            <FormTextField
              required
              name="first_name"
              label="First Name"
              autoFocus
            />

            <FormTextField
              required
              name="last_name"
              label="Last Name"
              autoFocus
            />

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

            <FormTextField
              required
              name="repeat-password"
              label="Repeat Password"
              autoFocus
              type="password"
            />

            <OutlinedButton text="Submit"/>

            <Grid container>
              <Grid item>
                <LinkComponent href="/login" variant="body2" text="Already have an account? Sign In" />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </PageLayout>
      <Outlet/>
    </>
  );
};

export default Signup;
