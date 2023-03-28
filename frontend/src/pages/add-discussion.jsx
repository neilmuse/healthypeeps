import * as React from 'react';
import {
  Box,
  Container,
} from '@mui/material';
import { Outlet } from 'react-router-dom';


import logo from '../assets/logo-temp.png';

import DialogBox from '../components/dialog-box.jsx';
import TextField from '../components/textfield';
import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';

const Discussion = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <CardMedia
            height="140"
            image={logo}
            alt="temporary logo"
          />

          <Typography variant="title" text="Add Discussion" />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >

            <TextField
              required
              name="title"
              label="Title"
              autoFocus
            />

            <TextField
              required
              name="content"
              label="Content"
              autoFocus
              maxRows="15"
            />

            <DialogBox />
          </Box>
        </Box>
      </Container>
      <Outlet />
    </>
  );
};

export default Discussion;

