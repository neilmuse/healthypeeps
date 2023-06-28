// Frontend
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

import { authGetAllPostsTitleByCategory } from "../auth";

export default function SearchField({ category, triggerRefetch }) {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await authGetAllPostsTitleByCategory(category);
        setTitles(response);
      } catch (error) {
        console.error('Failed to fetch titles:', error);
      }
    };
    
    fetchTitles();
  }, [category, triggerRefetch]);

  return (
    <Stack spacing={1} justifyContent="center" maxWidth="xl">
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={titles}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <Button variant="contained">Search</Button>
    </Stack>
  );
}
