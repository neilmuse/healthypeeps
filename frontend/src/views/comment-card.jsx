import React from 'react';
import ReactDOM from 'react-dom';

import { Divider, Avatar, Grid, Paper } from '@mui/material';

import comments from '../data/comments.json';

import PictureCard from '../components/picture-card.jsx';
import SimpleText from '../components/simple-text.jsx';
import CommentBox from '../components/comment-box.jsx';

const CommentCard = () => {
  return (
    <>
      <SimpleText text="Comments" variant="title" />
      <CommentBox />

      {comments.map((comment) => (
        <Paper style={{ padding: "40px 20px" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="image" src={comment?.image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <SimpleText text={comment?.author.name} />
              <SimpleText text={comment?.content} />
              <SimpleText text={comment?.createdAt} />
            </Grid>
          </Grid>
          <Divider variant="fullWidth" style={{ margin: "30px 0" }} />

        </Paper>))}
    </>
  );
};

export default CommentCard;