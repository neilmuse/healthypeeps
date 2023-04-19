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
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo-temp.png';

import TextField from '../components/textfield.jsx';
import Button from '../components/button.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Typography from '../components/typography.jsx';
import Link from '../components/link.jsx';
import Box from '../components/box.jsx';

import { signup } from '../api/index.js';

const Signup = () => {
  const NAVIGATE = useNavigate();

  const [fieldErrors, setFieldErrors] = React.useState({
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    password: false,
    repeatPassword: false,
  });

  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    user_type: "normal",
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
      first_name: !formData.get("first_name"),
      last_name: !formData.get("last_name"),
      email: !formData.get("email"),
      phone_number: !formData.get("phone_number"),
      password: !formData.get("password"),
      repeatPassword: !formData.get("repeatPassword"),
    };

    setFieldErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const user = {
      username: formData.get("email"),
      email: formData.get("email"),
      password: formData.get("password"),
      user_type: "normal",
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      phone_number: formData.get("phone_number"),
    };

    try {
      const result = await signup(user);
      console.log(result);
      NAVIGATE('login');
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
                name="first_name"
                label="First Name"
                autoFocus
                error={fieldErrors.first_name}
                onBlur={(e) => handleBlur('first_name', e.target.value)}
                helperText={fieldErrors.first_name && 'First name is required.'}
                onChange={handleChange}
              />

              <TextField
                required
                name="last_name"
                label="Last Name"
                error={fieldErrors.last_name}
                onBlur={(e) => handleBlur('last_name', e.target.value)}
                helperText={fieldErrors.last_name && 'Last name is required.'}
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

              <TextField
                required
                name="phone_number"
                label="Phone Number"
                error={fieldErrors.email}
                onBlur={(e) => handleBlur('phone_number', e.target.value)}
                helperText={fieldErrors.phone_number && 'Phone number is required.'}
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
