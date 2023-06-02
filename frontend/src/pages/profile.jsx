import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  TextField,
} from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';

import COLORS from '../constants/colors.js';

import profiles from '../data/profiles.json';

import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Card from '../components/card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';

import { authGetUserData } from "../auth";
import { AuthContext } from '../context/auth-context';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  
  //   if (token) {
  //     authGetUserData(token).then(response => {
  //       console.log("RESPONSE", response);
  //       setUser(response);
  //       console.log(response.user);
  //     }).catch(err => {
  //       // handle error
  //       console.error(err);
  //     });
  //   }
  // }, []);

  // const [isEditing, setIsEditing] = useState(false);
  // const [formValues, setFormValues] = useState({
  //   firstName: user.firstName ?? "",
  //   lastName: user.lastName ?? "",
  //   email: user.email ?? "",
  //   phoneNumber: user.phoneNumber ?? "",
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormValues({
  //     ...formValues,
  //     [name]: value,
  //   });
  // };

  // const handleEditButtonClick = () => {
  //   setIsEditing(true);
  // };

  // const handleSaveButtonClick = () => {
  //   // Save updated data to MongoDB
  //   // ...

  //   setIsEditing(false);
  // };

  // const handleCancelButtonClick = () => {
  //   setIsEditing(false);
  // };

  return (
    <>
      <Box sx={{ border: 1 }}>
        <Typography variant="title" text={user ? `Hello, ${user.firstName + "!"}` : 'Hello, Guest!'} />
        {/* <Card>
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
                  user?.firstName + " " + user?.lastName ?? "N/A"
                }
              />
              <CardMedia image={user?.profile_picture ?? ""} />
              <Divider />
              <Typography variant="title" text={user?.email ?? "N/A"} />
              <Typography
                variant="body1"
                text={user.phoneNumber ?? "N/A"}
              />
              <Divider />
              <Button onClick={handleEditButtonClick}>Edit Profile</Button>
            </>
          )}
        </Card> */}
      </Box>
      <Outlet />
    </>
  );
};

export default Profile;
