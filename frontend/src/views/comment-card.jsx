import React from 'react';
import ReactDOM from 'react-dom';

import { Avatar, Grid, Paper } from '@mui/material';

import comments from '../data/comments.json';

import Typography from '../components/typography.jsx';
import CommentBox from '../components/comment-box.jsx';
import Divider from '../components/divider.jsx';

const CommentCard = () => {
  return (
    <>
      <Typography text="Comments" variant="title" />
      <CommentBox />

      {comments.map((comment) => (
        <Paper style={{ padding: "40px 20px" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="image" src={comment?.image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Typography text={comment?.author.name} />
              <Typography text={comment?.content} />
              <Typography text={comment?.createdAt} />
            </Grid>
          </Grid>
          <Divider/>

        </Paper>))}
    </>
  );
};

export default CommentCard;