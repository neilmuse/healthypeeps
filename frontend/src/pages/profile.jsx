import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Grid, Snackbar, TextField } from '@mui/material';
import { Outlet } from 'react-router-dom';

import icon from '../assets/profile.png';

import COLORS from '../constants/colors.js';

import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Card from '../components/card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';

import { authGetUserData, authUpdateUserData } from "../auth";
import { AuthContext } from '../context/auth-context';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const [formValues, setFormValues] = useState({
    _id: user?._id ?? null,
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
  
    if (token) {
      authGetUserData(token).then(response => {
        setUser(response);
        setFormValues({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          phoneNumber: response.phoneNumber,
        });
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
        setIsLoading(false);
      });
    }
  }, []);

  if(isLoading){
    return <div>Loading...</div>
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Ensure formValues includes the user's _id
      if (user && user._id) {
        formValues._id = user._id;
      } else {
        throw new Error("User ID is missing");
      }

      const updatedUser = await authUpdateUserData(formValues);

      if (updatedUser.error && updatedUser.error === 'Email already taken') {
        setAlertMessage('Email is already taken.');
        setOpen(true);
        return;
      }

      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  const validate = () => {
    const errors = {};
    
    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formValues.email.match(emailRegex)) {
      errors.email = 'Invalid email format';
    }

    // Validate phone number format (you can update regex as per your requirement)
    const phoneNumberRegex = /^(09|\+639)\d{9}$/; 
    if (!formValues.phoneNumber.match(phoneNumberRegex)) {
      errors.phoneNumber = 'Invalid phone number format';
    }

      // Validate first and last name
    if (!formValues.firstName.trim()) {
      errors.firstName = 'First name cannot be empty';
    }

    if (!formValues.lastName.trim()) {
      errors.lastName = 'Last name cannot be empty';
    }

    return errors;
  };

  return (
    <>
      <Box sx={{ border: 1 }}>
        <Card>
        {isEditing ? (
            <>
              <TextField
                label="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />

              <TextField
                label="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />

              <Divider />

              <TextField
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />

              <Divider />

              <Button onClick={handleSaveButtonClick}>Save</Button>
              <Button onClick={handleCancelButtonClick}>Cancel</Button>
            </>
          ) : (
            <>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <img src={icon} style={{width: '100vw', maxWidth: '300px'}} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                      <Typography
                          variant="hero_title"
                          text={
                              user?.firstName + " " + user?.lastName ?? "N/A"
                          }
                      />

                      <Divider />

                      <Typography variant="title" text={user?.email ?? "N/A"} />

                      <Typography
                          variant="body1"
                          text={user.phoneNumber ?? "N/A"}
                      />

                      <Divider />

                      <Button onClick={handleEditButtonClick}>Edit Profile</Button>
                  </Grid>
              </Grid>
            </>
          )}
        </Card>

        <Snackbar
          open={open}
          autoHideDuration={5000}
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

export default Profile;