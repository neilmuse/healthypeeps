import * as React from 'react';
import { Avatar, Box, Container, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import COLORS from '../constants/colors.js'

import logo from "../assets/logo-temp.png"

import FormTextField from "../components/text-field.jsx";
import Button from "../components/button.jsx";
import SimpleText from "../components/simple-text.jsx";
import LinkComponent from "../components/link.jsx";
import GridContainer from '../components/grid-container.jsx';
import PageLayout from '../components/page-box-layout.jsx';

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
      <PageLayout>
        <Container maxWidth="sm">

            <img src={logo} />

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

              <Button text="Sign In" primary submit/>

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
      </PageLayout>
      <Outlet/>
    </>
  );
};

export default Login;
