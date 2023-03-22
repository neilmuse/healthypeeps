import React from "react";
import ReactDOM from "react-dom";

import { Divider, Avatar, Grid, Paper } from "@mui/material";

import comments from '../data/comments.json';
import recipes from '../data/recipes.json';

import PictureCard from "../components/picture-card.jsx";
import SimpleText from '../components/simple-text.jsx';
import ControlledCheckbox from '../components/checkbox.jsx';

const PostCard = ({ author, title, description }) => {
  return (
    <>
      <SimpleText text="Pending Posts" variant="title" />

      {recipes.map((post) => (
        <Paper style={{ padding: "20px 30px" }}>
          <Grid container spacing={1}>
            <ControlledCheckbox/>
            <Grid item>
              <Avatar alt="image" src={post?.image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <SimpleText variant="cardtitle" text={post?.author.name} />
              <SimpleText text={post?.title} />
              <SimpleText variant="body1" text={post?.description} />
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: "10px 0" }} />

        </Paper>))}
    </>
  );
};

export default PostCard;