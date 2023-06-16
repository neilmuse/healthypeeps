import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Avatar, Grid, Paper } from '@mui/material';

import comments from '../data/comments.json';

import Typography from '../components/typography.jsx';
import CommentBox from '../components/comment-box.jsx';
import Divider from '../components/divider.jsx';

import { authGetCommentsByPostId } from '../auth';

const CommentCard = ({ postId, authorId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await authGetCommentsByPostId(postId);
        response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(response); // set comments in reverse order
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const addNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <>
      <Typography text="Comments" variant="title" />
      <CommentBox postId={postId} authorId={authorId} addedComment={addNewComment} />

      {comments.map((comment) => (
        <Paper key={comment._id} style={{ padding: "40px 20px" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="image" src={comment?.image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Typography text={comment?.author?.firstName} />
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