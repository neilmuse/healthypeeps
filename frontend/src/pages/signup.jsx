import * as React from 'react';
import {
  Avatar,
  Box as MUIBox,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  TextField as MUITextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import logo from '../assets/logo-temp.png';

import TextField from '../components/textfield.jsx';
import Button from '../components/button.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Typography from '../components/typography.jsx';
import Link from '../components/link.jsx';
import Box from '../components/box.jsx';

const Signup = () => {
  const [fieldErrors, setFieldErrors] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "normal",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleBlur = (field, value) => {
    setFieldErrors((prevErrors) => ({ ...prevErrors, [field]: !value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newErrors = {
      firstName: !formData.firstName,
      lastName: !formData.lastName,
      email: !formData.email,
      password: !formData.password,
      repeatPassword: !formData.repeatPassword,
    };

    setFieldErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const result = await signup(formData);
      console.log(result);
    } catch (error) {
      console.error("Signup failed", error);
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
                name="firstName"
                label="First Name"
                autoFocus
                error={fieldErrors.firstName}
                onBlur={(e) => handleBlur('firstName', e.target.value)}
                helperText={fieldErrors.firstName && 'First name is required.'}
                onChange={handleChange}
              />

              <TextField
                required
                name="lastName"
                label="Last Name"
                error={fieldErrors.lastName}
                onBlur={(e) => handleBlur('lastName', e.target.value)}
                helperText={fieldErrors.lastName && 'Last name is required.'}
                onChange={handleChange}
              />

              <TextField
                required
                name="email"
                label="Email Address"
                error={fieldErrors.email}
                onBlur={(e) => handleBlur('email', e.target.value)}
                helperText={fieldErrors.email && 'Email is required.'}
                onChange={handleChange}
              />

              <MUITextField
                required
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                error={fieldErrors.password}
                onBlur={(e) => handleBlur('password', e.target.value)}
                helperText={fieldErrors.password && 'Password is required.'}
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
                onChange={handleChange}
              />

              <MUITextField
                required
                name="repeatPassword"
                label="Repeat Password"
                type={showRepeatPassword ? 'text' : 'password'}
                error={fieldErrors.repeatPassword}
                onBlur={(e) => handleBlur('repeatPassword', e.target.value)}
                helperText={fieldErrors.repeatPassword && 'Repeat password is required.'}
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
                onChange={handleChange}
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
      </Box>
      <Outlet />
    </>
  );
};

export default Signup;
