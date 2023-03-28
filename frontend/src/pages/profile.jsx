import React, { useState } from 'react';
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

const Profile = () => {
  const { id } = useParams();
  const profile = profiles[id] ?? {};

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: profile.first_name ?? "",
    lastName: profile.last_name ?? "",
    email: profile.email ?? "",
    phoneNumber: profile.phone_number ?? "",
  });

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

  const handleSaveButtonClick = () => {
    // Save updated data to MongoDB
    // ...

    setIsEditing(false);
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
                  profile?.first_name + " " + profile?.last_name ?? "N/A"
                }
              />
              <CardMedia image={profile?.profile_picture ?? ""} />
              <Divider />
              <Typography variant="title" text={profile?.email ?? "N/A"} />
              <Typography
                variant="body1"
                text={profile.phone_number ?? "N/A"}
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
