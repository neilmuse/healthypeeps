import React, { useContext, useState } from 'react';
import {
  Grid,
  Paper,
} from '@mui/material';

import TextField from '../components/textfield';
import Button from './button.jsx';
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
      authorId: user._id
    };

    try {
      const response = await authAddComment(commentData);
      // Ensure that the response has the required fields
      const newComment = {
        author: {
          firstName: user.firstName
        },
        content: comment,
        createdAt: ConvertTime(new Date()),
        ...response,
      }
      addedComment(newComment);
      setComment(''); // Clear the comment input
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentBox;
