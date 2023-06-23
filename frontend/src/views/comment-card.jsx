import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Avatar, Grid, Paper } from '@mui/material';

import comments from '../data/comments.json';

import Typography from '../components/typography.jsx';
import CommentBox from '../components/comment-box.jsx';
import Divider from '../components/divider.jsx';

import ConvertTime from '../utils/moment.jsx';

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
        <Paper key={comment._id} style={{ padding: "20px 20px", overflow: 'hidden' }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="image" src={comment?.image} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography text={comment?.author?.firstName + " " + comment?.author?.lastName} variant="body_bold" />
                </Grid>
                <Grid item>
                  <Typography text={ConvertTime(comment?.createdAt)} />
                </Grid>
              </Grid>
              <div style={{ wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                <Typography text={comment?.content} />
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}

    </>
  );
};

export default CommentCard;
