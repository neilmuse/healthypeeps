import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Outlet } from 'react-router-dom';

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
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phoneNumber: user?.phoneNumber ?? "",
  });

  console.log("USER FROM PROFILE", user);
  console.log("ID", user._id);

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
    try {
      console.log("FORM VALUES", formValues);
      const updatedUser = await authUpdateUserData(formValues);
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  const handleCancelButtonClick = () => {
    setIsEditing(false);
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
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
              <Divider />
              <TextField
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
              <Divider />
              <Button onClick={handleSaveButtonClick}>Save</Button>
              <Button onClick={handleCancelButtonClick}>Cancel</Button>
            </>
          ) : (
            <>
              <Typography
                variant="hero_title"
                text={
                  user?.first_name + " " + user?.last_name ?? "N/A"
                }
              />
              {/* <CardMedia image={user?.user_picture ?? ""} /> */}
              <Divider />
              <Typography variant="title" text={user?.email ?? "N/A"} />
              <Typography
                variant="body1"
                text={user.phone_number ?? "N/A"}
              />
              <Divider />
              <Button onClick={handleEditButtonClick}>Edit Profile</Button>
            </>
          )}
        </Card>
      </Box>
      <Outlet />
    </>
  );
};

export default Profile;
