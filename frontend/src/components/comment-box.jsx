import React, { useContext, useState } from 'react';
import {
  Button, 
  TextField,
  Grid,
  Paper,
  Box
} from '@mui/material';

import Divider from '../components/divider.jsx';

import ConvertTime from '../utils/moment.jsx';

import { authAddComment } from "../auth";
import { AuthContext } from '../context/auth-context';

const CommentBox = ({ postId, authorId, addedComment }) => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const commentData = {
      content: comment,
      postId: postId,
      authorId: authorId // Use authorId passed as prop
    };

    try {
      const response = await authAddComment(commentData);

      console.log("RESPONSE", response);
      
      const newComment = {
        _id: response.comment._id,
        author: {
          _id: authorId,
          firstName: user.firstName,
          lastName: user.lastName
        },
        content: comment,
        createdAt: new Date(),
        ...response,
      };      
    
      addedComment(newComment);
      setComment(''); // Clear the comment input
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Box width="100%">
        <Grid container spacing={1} alignItems="center">
          <Grid item xs>
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              variant="outlined"
              fullWidth
            />        
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default CommentBox;
