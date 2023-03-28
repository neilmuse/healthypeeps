import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  useMediaQuery,
  TextField,
} from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';

import COLORS from '../constants/colors.js';

import profiles from '../data/profiles.json';

import SimpleText from '../components/simple-text.jsx';
import GridContainer from '../components/grid-container.jsx';
import PictureCard from '../components/picture-card.jsx';
import AvatarIcon from '../components/avatar-icon.jsx';

import CardComponent from '../components/card-component.jsx';
import CommentCard from '../views/comment-card.jsx';
import PageLayout from '../components/page-box-layout.jsx';
import ContentDivider from '../components/divider-content.jsx';

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
      <PageLayout sx={{ border: 1 }}>
        <CardComponent>
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
              <ContentDivider />
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
              <ContentDivider />
              <Button onClick={handleSaveButtonClick}>Save</Button>
              <Button onClick={handleCancelButtonClick}>Cancel</Button>
            </>
          ) : (
            <>
              <SimpleText
                variant="hero_title"
                text={
                  profile?.first_name + " " + profile?.last_name ?? "N/A"
                }
              />
              <PictureCard image={profile?.profile_picture ?? ""} />
              <ContentDivider />
              <SimpleText variant="title" text={profile?.email ?? "N/A"} />
              <SimpleText
                variant="body1"
                text={profile.phone_number ?? "N/A"}
              />
              <ContentDivider />
              <Button onClick={handleEditButtonClick}>Edit Profile</Button>
            </>
          )}
        </CardComponent>
      </PageLayout>
      <Outlet />
    </>
  );
};

export default Profile;
