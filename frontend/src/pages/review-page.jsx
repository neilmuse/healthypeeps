import React, { useContext, useEffect, useState } from 'react';
import {
    Box as MUIBox,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Link,
    List,
    ListItem,
    Menu,
    MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../api/index.js';

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

import { authDeletePost } from '../auth';

const ReviewPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const NAVIGATE = useNavigate();
    const post = JSON.parse(localStorage.getItem('data'));

    const [anchorEls, setAnchorEls] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
  
    const handleMenuClick = (event, postId) => {
        setAnchorEls({ ...anchorEls, [postId]: event.currentTarget });
    };

    const handleMenuClose = (postId) => {
    setAnchorEls({ ...anchorEls, [postId]: null });
    };

    const handleEdit = () => {
    setIsEditing(true);
    handleMenuClose();
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
      try {
        await authDeletePost(postToDelete);
        NAVIGATE('/home');
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    };
  
    const isCurrentUserAuthor = user?._id === post?.author;

    return (
        <>
        <Box sx={{ border: 1 }}>
            <Card>
            <Grid item>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="hero_title" text={post.title ?? "N/A"} />

                    {isCurrentUserAuthor && (
                        <>
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
                        </>
                    )}
                </Grid>

                <div style={imageContainerStyleCard}>
                    <img src={post.image || 'https://picsum.photos/200'} alt="Image Description Temp" style={imageStyleCard} />
                </div>

                <Divider />

                <Typography variant="title" text="Brief Description" />
                <Typography variant="body1" text={post.description ?? "N/A"} />

                <Divider />

                <MUIBox
                sx={{
                    backgroundColor: COLORS.LIGHT_GREEN,
                }}
                >

                <Grid container spacing={2} p={3}>
                </Grid>
                </MUIBox>

                <Divider />

                <CommentCard postId={post?._id} authorId={user?._id} />
            </Grid>
            </Card>
        </Box>

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
