import React, { useContext } from 'react';
import {
  Alert,
  Box as MUIBox,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField as MUITextField,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import logo from '../assets/logo-temp.png';

import Button from '../components/button.jsx';
import Typography from '../components/typography.jsx';
import LinkComponent from '../components/link.jsx';
import Box from '../components/box.jsx';

import { AuthContext } from '../context/auth-context';

const Login = () => {
  const NAVIGATE = useNavigate();
  const { setUser, login } = useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const [isLoading, setIsLoading] = React.useState(false); // State for the loading icon

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setEmailError(!email);
    setPasswordError(!password);
  
    if (!email || !password) {
      return;
    }
  
    setIsLoading(true);
    
    try {
      const formData = { email, password };
      const userData = await login(formData);
      setTimeout(() => {
        setIsLoading(false);
        NAVIGATE('/');
      }, 250);
      
    } catch (error) {
      setIsLoading(false);
      setAlertMessage('Check your email or password.');
      setOpen(true);
    }
  };

  const handleBlur = (fieldValue, setError) => {
    setError(!fieldValue);
  };

  return (
    <>
      {isLoading && ( // Display loading icon if isLoading is true
        <MUIBox
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </MUIBox>
      )}

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
                    <LinkComponent href="/signup" variant="body2" text="Don't have an account? Sign Up" />
                  </Grid>
                </Grid>
              </MUIBox>
            </Grid>
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

export default Login;
