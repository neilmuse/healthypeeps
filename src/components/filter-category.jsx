import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterCategory() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Category</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={category}
        label="Category"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        
        <MenuItem value={"Recipe"}>Recipe</MenuItem>
        <MenuItem value={"Discussion"}>Discussion</MenuItem>
        <MenuItem value={"Review"}>Review</MenuItem>
        <MenuItem value={"Listing"}>Listing</MenuItem>
      </Select>
    </FormControl>
  );
}