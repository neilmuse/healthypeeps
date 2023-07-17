import React, { useContext, useState } from 'react';
import {
  Button, 
  TextField,
  Grid,
  Paper,
  Box
} from '@mui/material';
import { Alert, Snackbar } from '@mui/material';

import Divider from '../components/divider.jsx';

import ConvertTime from '../utils/moment.jsx';

import { authAddComment } from "../auth";
import { AuthContext } from '../context/auth-context';

const CommentBox = ({ postId, authorId, addedComment }) => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setOpenAlert(true);
      return;
    }

    const commentData = {
      content: comment,
      postId: postId,
      authorId: authorId // Use authorId passed as prop
    };

    try {
      const response = await authAddComment(commentData);
      
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Box width="100%" marginBottom={3}>
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

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          You need to log in to add comments!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default CommentBox;
