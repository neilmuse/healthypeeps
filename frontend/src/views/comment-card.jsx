import React, { useContext, useEffect, useState } from 'react';

import {
  Avatar,
  Grid,
  Paper,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Typography from '../components/typography.jsx';
import CommentBox from '../components/comment-box.jsx';
import ConvertTime from '../utils/moment.jsx';

import { authGetCommentsByPostId, authEditComment, authDeleteComment } from '../auth';

import { AuthContext } from '../context/auth-context';

const CommentCard = ({ postId, authorId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [anchorEls, setAnchorEls] = useState({});
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await authGetCommentsByPostId(postId);
        response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(response);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]);

  const addNewComment = (newComment) => {
    console.log("NEW COMMENT", newComment);
    newComment.author = {
        _id: authorId,
        firstName: newComment.author.firstName,
        lastName: newComment.author.lastName
    };
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await authDeleteComment(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      console.log("Editing comment ID:", isEditing);
      const updatedComment = await authEditComment(isEditing, editingContent);
      updatedComment.author = { 
        _id: authorId, 
        firstName: user.firstName,
        lastName: user.lastName 
      }; 
      setComments(comments.map(comment => comment._id === isEditing ? updatedComment : comment));
      setIsEditing(null); // reset the isEditing state
    } catch (error) {
      console.error("Error editing comment:", error);
    }
}; 


  const openDeleteModal = (commentId) => {
    setCommentToDelete(commentId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteComment(commentToDelete);
    setDeleteModalOpen(false);
  };

  const handleMenuClick = (event, commentId) => {
    setAnchorEls({ ...anchorEls, [commentId]: event.currentTarget });
  };

  const handleMenuClose = (commentId) => {
    setAnchorEls({ ...anchorEls, [commentId]: null });
  };

  const openEditModal = (comment) => {
    setEditingContent(comment.content);
    setIsEditing(comment._id);
    handleMenuClose(comment._id);
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
                {isEditing === comment._id ? (
                  <div>
                    <TextField
                      multiline
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      variant="outlined"
                      style={{
                        width: '100%',
                        marginBottom: '8px'
                      }}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ marginRight: '8px' }}
                      onClick={() => setIsEditing(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <Typography text={comment?.content} />
                )}
              </div>
            </Grid>
            {comment.author._id === authorId && (
              <Grid item>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuClick(e, comment._id)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEls[comment._id]}
                  open={Boolean(anchorEls[comment._id])}
                  onClose={() => handleMenuClose(comment._id)}
                >
                  <MenuItem onClick={() => openEditModal(comment)}>Edit</MenuItem>
                  <MenuItem onClick={() => openDeleteModal(comment._id)}>Delete</MenuItem>
                </Menu>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <DialogTitle>{"Delete Comment?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Are you sure you want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommentCard;
