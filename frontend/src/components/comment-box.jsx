import * as React from 'react';
import {
  Grid,
  Paper,
} from '@mui/material';

import TextField from '../components/textfield';
import Button from './button.jsx';
import Divider from '../components/divider.jsx';

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
            <TextField
                required
                name="comment"
                label="Comment"
                autoFocus
                rows="10"
                maxRows="15"
            />

            <Button text="Comment"/>
            </Grid>

            <Divider/>

        </Paper>
    </>
  );
};

export default Discussion;

