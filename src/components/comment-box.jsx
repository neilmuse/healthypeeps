import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

import FormTextField from '../components/text-field';
import OutlinedButton from './button.jsx';
import SimpleText from '../components/simple-text.jsx';

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
        <Paper style={{ padding: "40px" }}>
            <Grid container spacing={2}>
            <FormTextField
                required
                name="comment"
                label="Comment"
                autoFocus
                rows="10"
                maxRows="15"
            />

            <OutlinedButton text="Comment"/>
            </Grid>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

        </Paper>
    </>
  );
};

export default Discussion;

