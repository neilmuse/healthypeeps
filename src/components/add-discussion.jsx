import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

import COLORS from "../constants/colors.js";

import logo from "../assets/logo-temp.png";

import DialogBox from "../components/dialog-box.jsx";
import FormTextField from "../components/text-field";
import OutlinedButton from "../components/button.jsx";
import SimpleText from "../components/simple-text.jsx";
import PictureCard from "../components/picture-card.jsx";

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
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <PictureCard
            height="140"
            image={logo}
            alt="temporary logo"
          />

          <SimpleText variant="title" text="Add Discussion" />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >

            <FormTextField
              required
              name="title"
              label="Title"
              autoFocus
            />

            <FormTextField
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

