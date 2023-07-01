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

import { authEditPost, authDeletePost, authGetSpecificPostById } from '../auth';

const ReviewPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const NAVIGATE = useNavigate();
    const [post, setPost] = useState(null);

    const [anchorEls, setAnchorEls] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(post?.title ?? '');
    const [editingContent, setEditingContent] = useState(post?.content ?? '');
    const [editingImage, setEditingImage] = useState(post?.image ?? '');

  
    const handleMenuClick = (event, postId) => {
        setAnchorEls({ ...anchorEls, [postId]: event.currentTarget });
    };

    const handleMenuClose = (postId) => {
        setAnchorEls({ ...anchorEls, [postId]: null });
    };

    const handleEdit = () => {
        setEditingTitle(post?.title ?? '');
        setEditingContent(post?.content ?? '');
        setEditingImage(post?.image ?? '');
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

    const handleSaveEdit = async () => {
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

                        {isEditing ? (
                            <TextField
                                multiline
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                variant="outlined"
                                style={{ width: '100%', marginBottom: '8px' }}
                            />
                        ) : (
                            <Typography variant="hero_title" text={post.title ?? "N/A"} />
                        )}

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

                    {isEditing ? (
                        <Input
                        type="file"
                        onChange={(e) => setEditingImage(e.target.files[0])}
                        style={{ marginBottom: '8px' }}
                        />
                    ) : (
                        <div style={imageContainerStyleCard}>
                        <img src={post.image || 'https://picsum.photos/200'} alt="Image Description Temp" style={imageStyleCard} />
                        </div>
                    )}

                    <Divider />

                    <Typography variant="title" text="Brief Description" />

                    {isEditing ? (
                        <TextField
                        multiline
                        rows={4}
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        variant="outlined"
                        style={{ width: '100%', marginBottom: '8px' }}
                        />
                    ) : (
                        <MUITypography
                        variant="body1"
                        style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {post?.content ?? "N/A"}
                        </MUITypography>
                    )}

                    {isEditing ? (
                        <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginRight: '8px' }}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                            Save
                        </Button>
                        </div>
                    ) : null}

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
