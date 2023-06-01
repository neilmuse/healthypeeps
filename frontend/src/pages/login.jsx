import * as React from 'react';
import {
  Box as MUIBox,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField as MUITextField,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import logo from '../assets/logo-temp.png';

import Button from '../components/button.jsx';
import Typography from '../components/typography.jsx';
import LinkComponent from '../components/link.jsx';
import Box from '../components/box.jsx';
import { authLogin } from "../auth";


const Login = () => {
  console.log("rd");
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setEmailError(!email);
    setPasswordError(!password);
  
    if (!email || !password) {
      return;
    }
  
    try {
      const formData = { email, password };
      const userData = await authLogin(formData);

      console.log('User data:', userData);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };  

  const handleBlur = (fieldValue, setError) => {
    setError(!fieldValue);
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
                <MUITextField
                  required
                  name="email"
                  label="Email Address"
                  autoFocus
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur(email, setEmailError)}
                  error={emailError}
                  helperText={emailError && 'Email is required.'}
                />

                <MUITextField
                  required
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur(password, setPasswordError)}
                  fullWidth
                  sx={{ mt: 1 }}
                  error={passwordError}
                  helperText={passwordError && 'Password is required.'}
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
