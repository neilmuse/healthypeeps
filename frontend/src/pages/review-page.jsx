import React, { useContext, useEffect, useState } from 'react';
import {
  CircularProgress,
  Box as MUIBox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Input,
  Link,
  List,
  ListItem,
  Menu,
  MenuItem,
  TextField,
  Typography as MUITypography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import COLORS from '../constants/colors.js';

import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Avatar from '../components/avatar.jsx';
import Card from '../components/card.jsx';
import CommentCard from '../views/comment-card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';

import { imageStyleCard, imageContainerStyleCard, modalStyle } from '../constants/styles';

import { AuthContext } from '../context/auth-context';

import { authEditPost, authDeletePost, authGetSpecificPostById, authGetUserById } from '../auth';

const ReviewPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const NAVIGATE = useNavigate();
    const [post, setPost] = useState(null);

    const [anchorEls, setAnchorEls] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [author, setAuthor] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(post?.title ?? '');
    const [editingContent, setEditingContent] = useState(post?.content ?? '');
    const [editingImage, setEditingImage] = useState(post?.image ?? '');

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [titleHelperText, setTitleHelperText] = useState('');
    const [contentHelperText, setContentHelperText] = useState('');

    const [isLoading, setIsLoading] = React.useState(false); // State for the loading icon
  
    const handleMenuClick = (event, postId) => {
        setAnchorEls({ ...anchorEls, [postId]: event.currentTarget });
    };

    const handleMenuClose = (postId) => {
        setAnchorEls({ ...anchorEls, [postId]: null });
    };

    const handleEdit = () => {
        // Set the editing states to the current post data
        setEditingTitle(post?.title ?? '');
        setEditingContent(post?.content ?? '');
        setEditingImage(post?.image ?? '');
        setIsEditing(true);
        handleMenuClose();
      };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setTitleError(false);
        setContentError(false);
        setTitleHelperText('');
        setContentHelperText('');
      };    
  
    const openDeleteModal = (postId) => {
      setPostToDelete(postId);
      setDeleteModalOpen(true);
    };
  
    const handleConfirmDelete = () => {
      handleDeletePost(postToDelete);
      setDeleteModalOpen(false);
    };
  
    const handleDeletePost = async (postToDelete) => {
      setIsLoading(true);
      try {
        await authDeletePost(postToDelete);
        setTimeout(() => {
          setIsLoading(false);
          NAVIGATE('/');
        }, 250);
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    };

    const handleSaveEdit = async () => {

        let isValid = true;
    
        if (!editingTitle.trim()) { // Check if title is empty
          setTitleError(true);
          setTitleHelperText("Title is required");
          isValid = false;
        }
      
        if (!editingContent.trim()) { // Check if content is empty
          setContentError(true);
          setContentHelperText("Content is required");
          isValid = false;
        }
      
        if (!isValid) {
          return;
        }

        try {
            const updatedPostData = {
                title: editingTitle || post.title,
                content: editingContent || post.content,
                image: editingImage || post.image
            };
            const updatedPost = await authEditPost(post._id, updatedPostData);
            setPost(updatedPost);
            setIsEditing(false);
        } catch (error) {
            console.error("Error editing post: ", error);
        }
      };

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const fetchedPost = await authGetSpecificPostById(id);
            setPost(fetchedPost);

            if (fetchedPost?.author) {
              const authorData = await authGetUserById(fetchedPost.author);
              setAuthor(authorData);
            }
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
        
        fetchPost();
    }, [id]);
  
    const isCurrentUserAuthor = user?._id === post?.author;

    return (
        <>
          {post ? (
            <Box sx={{ border: 1 }}>
              <Card>
                <Grid item>
                  <Grid container justifyContent="space-between" alignItems="center">
                    {isLoading && ( // Display loading icon if isLoading is true
                      <MUIBox
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            zIndex: 9999,
                        }}
                      >
                        <CircularProgress />
                      </MUIBox>
                    )}
                    {isEditing ? (
                        <TextField
                            label="Post Title"
                            placeholder="Enter post title"
                            error={titleError}
                            helperText={titleHelperText}
                            multiline
                            value={editingTitle}
                            onChange={(e) => {
                                setTitleError(false);
                                setTitleHelperText('');
                                setEditingTitle(e.target.value);
                            }}
                            variant="outlined"
                            style={{ width: '100%', marginBottom: '8px' }}
                        />
                    ) : (
                      <>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                  <Typography variant="hero_title" text={post.title ?? "N/A"} />
                                  {isCurrentUserAuthor && (
                                      <div>
                                          <IconButton
                                              aria-label="more"
                                              aria-controls="long-menu"
                                              aria-haspopup="true"
                                              onClick={(event) => handleMenuClick(event, post._id)}
                                          >
                                              <MoreVertIcon />
                                          </IconButton>

                                          <Menu
                                            anchorEl={anchorEls[post._id]}
                                            open={Boolean(anchorEls[post._id])}
                                            onClose={() => handleMenuClose(post._id)}
                                          >
                                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                            <MenuItem onClick={() => openDeleteModal(post._id)}>Delete</MenuItem>
                                          </Menu>
                                      </div>
                                  )}
                              </div>
                              <Typography variant="author" text={"by" + " " + author?.firstName + " " + author?.lastName} />
                          </div>
                      </>
                    )}
                  </Grid>

                  {post.image && <Divider />}

                  {!isEditing ? (
                    <div style={imageContainerStyleCard}>
                      {post.image && <img src={post.image} alt="Image Description Temp" style={imageStyleCard} />}
                    </div>

                    ) : null
                  }    

                  {!isEditing ? (
                    <Divider />
                    ) : null
                  }

                  {isEditing ? (
                      <TextField
                          label="Content"
                          placeholder="Enter the content of your post"
                          error={contentError}
                          helperText={contentHelperText}
                          multiline
                          rows={4}
                          value={editingContent}
                          onChange={(e) => {
                              setContentError(false); // Reset error state on change
                              setContentHelperText('');
                              setEditingContent(e.target.value);
                          }}
                          variant="outlined"
                          style={{ width: '100%', marginBottom: '8px' }}
                      />
                    ) : (  
                      <>
                          <Typography variant="title" text="Brief Description" />

                          <MUITypography
                          variant="body1"
                          style={{ whiteSpace: 'pre-wrap' }}
                          >
                              {post?.content ?? "N/A"}
                          </MUITypography>
                      </>
                    )}

                    {isEditing ? (
                        <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginRight: '8px' }}
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </Button>

                        <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                            Save
                        </Button>
                        </div>
                    ) : null}

                    <Divider />

                    <CommentCard postId={post?._id} authorId={user?._id} />
                </Grid>
                </Card>
            </Box>
        ) : (
            <Typography variant="body1" text={"Loading page..."} />
        )} 

        <Dialog
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
        >
            <DialogTitle>{"Delete Post?"}</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this post?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setDeleteModalOpen(false)} color="primary">
                    Cancel
                </Button>

                <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>

        <Outlet />
        </>
    );
};

export default ReviewPage;
