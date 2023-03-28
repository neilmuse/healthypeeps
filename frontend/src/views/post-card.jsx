import React, { useState } from 'react';
import { Avatar, Grid, Paper, Checkbox, FormControlLabel } from '@mui/material';
import recipes from '../data/recipes.json';
import Typography from '../components/typography.jsx';
import Divider from '../components/divider.jsx';

const PostCard = () => {
  const [checkedItems, setCheckedItems] = useState(recipes.map(() => false));

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setCheckedItems(checkedItems.map(() => isChecked));
  };

  const handleCheckboxChange = (index) => (event) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };

  const allSelected = checkedItems.every((item) => item);

  return (
    <>
      <Typography text="Pending Posts" variant="title" />
      <FormControlLabel
        control={
          <Checkbox
            checked={allSelected}
            onChange={handleSelectAll}
            color="primary"
          />
        }
        label="Select All"
      />
      {recipes.map((post, index) => (
        <Paper style={{ padding: "20px 30px" }} key={index}>
          <Grid container spacing={1}>
            <Grid item>
              <Checkbox
                checked={checkedItems[index]}
                onChange={handleCheckboxChange(index)}
                color="primary"
              />
            </Grid>
            <Grid item>
              <Avatar alt="image" src={post?.image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Typography variant="cardtitle" text={post?.author.name} />
              <Typography text={post?.title} />
              <Typography variant="body1" text={post?.description} />
            </Grid>
          </Grid>
          <Divider/>
        </Paper>
      ))}
    </>
  );
};

export default PostCard;
