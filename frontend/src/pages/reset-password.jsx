import React, { useState } from 'react';
import {
  Box as MUIBox,
  Container,
} from '@mui/material';
import TextField from '../components/textfield.jsx';
import Button from '../components/button.jsx';
import Typography from '../components/typography.jsx';
import Box from '../components/box.jsx';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      console.log('Password reset requested for:', email);
    } else {
      alert('New password and confirm password do not match');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box>
        <Typography variant="title" text="Reset Password"/>

        <MUIBox component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>

          <TextField
            variant="outlined"
            required
            name="newPassword"
            label="New Password"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => handleChange(event, setNewPassword)}
          />

          <TextField
            variant="outlined"
            required
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => handleChange(event, setConfirmPassword)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            text="Reset Password"
            sx={{ mt: 3 }}
          />
        </MUIBox>
      </Box>
    </Container>
  );
};

export default PasswordReset;
