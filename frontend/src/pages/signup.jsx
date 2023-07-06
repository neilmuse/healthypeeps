import * as React from 'react';
import {
  Alert,
  Avatar,
  Box as MUIBox,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField as MUITextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import logo from '../assets/logo-temp.png';

import TextField from '../components/textfield.jsx';
import Button from '../components/button.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Typography from '../components/typography.jsx';
import Link from '../components/link.jsx';
import Box from '../components/box.jsx';

import { signup } from "../auth";

const Signup = () => {
  const NAVIGATE = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const [fieldErrors, setFieldErrors] = React.useState({
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    password: false,
    repeat_password: false,
  });

  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    user_type: "normal",
  });

  const [errorMessages, setErrorMessages] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    repeat_password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let errorMessage = '';
  
    // validate each field
    if (name === 'first_name' || name === 'last_name' || name === 'email' || name === 'phone_number') {
      errorMessage = value ? '' : `${name.replace('_', ' ').charAt(0).toUpperCase() + name.replace('_', ' ').slice(1)} is required.`;
    } else if (name === 'password') {
      errorMessage = value ? '' : 'Password is required.';
    } else if (name === 'repeat_password') {
      errorMessage = value ? '' : 'Repeat password is required.';
    }
  
    setFormData({ ...formData, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: errorMessage });
    setFieldErrors({ ...fieldErrors, [name]: !!errorMessage });
};

  const handleBlur = (field, value) => {
    setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: !value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const user = {
      firstName: formData.get("first_name"),
      lastName: formData.get("last_name"),
      email: formData.get("email"),
      phoneNumber: formData.get("phone_number"),
      password: formData.get("password"),
      repeatPassword: formData.get("repeat_password"),
      userType: "normal",
    };

    try {
      const result = await signup(user);
      NAVIGATE('/login');
    } catch (error) {
      setAlertMessage('Check your details. Password be eight characters and must contain a number.');
      setOpen(true);
    }
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
                error={fieldErrors.first_name}
                helperText={errorMessages.first_name}
                onChange={handleChange}
                onBlur={(e) => handleBlur('first_name', e.target.value)}
              />

              <TextField
                required
                name="last_name"
                label="Last Name"
                error={fieldErrors.last_name}
                helperText={errorMessages.last_name}
                onChange={handleChange}
                onBlur={(e) => handleBlur('last_name', e.target.value)}
              />

              <TextField
                required
                name="email"
                label="Email Address"
                error={fieldErrors.email}
                helperText={errorMessages.email}
                onChange={handleChange}
                onBlur={(e) => handleBlur('email', e.target.value)}
              />

              <TextField
                required
                name="phone_number"
                label="Phone Number"
                error={fieldErrors.phone_number}
                helperText={errorMessages.phone_number}
                onChange={handleChange}
                onBlur={(e) => handleBlur('phone_number', e.target.value)}
              />

              <MUITextField
                required
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                error={fieldErrors.password}
                helperText={errorMessages.password}
                onChange={handleChange}
                onBlur={(e) => handleBlur('password', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <MUITextField
                required
                name="repeat_password"
                label="Repeat Password"
                type={showRepeatPassword ? 'text' : 'password'}
                error={fieldErrors.repeat_password}
                helperText={errorMessages.repeat_password}
                onChange={handleChange}
                onBlur={(e) => handleBlur('repeat_password', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button text="submit" primary submit fullWidth />

              <Grid container spacing={2}>
                <Grid item xs={6} alignItem="left" sx={{ marginTop: 2 }}>
                  <Link href="/login" variant="body2" text="Already have an account? Sign In" />
                </Grid>
              </Grid>
            </MUIBox>
          </Grid>
        </Container>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Outlet />
    </>
  );
};

export default Signup;
