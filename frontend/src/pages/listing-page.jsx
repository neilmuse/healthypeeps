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

import Card from '../components/card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';
import Typography from '../components/typography.jsx';
import CommentCard from '../views/comment-card.jsx';

import { imageStyleCard, imageContainerStyleCard, modalStyle } from '../constants/styles';

import { AuthContext } from '../context/auth-context';
import { authEditPost, authDeletePost, authGetSpecificPostById } from '../auth';

const ListingPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const NAVIGATE = useNavigate();
    const [post, setPost] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [editingImage, setEditingImage] = useState('');
    const [editingPrice, setEditingPrice] = useState('');
    const [editingLocation, setEditingLocation] = useState('');
    const [editingPhoneNumber, setEditingPhoneNumber] = useState('');
    const [editingEmail, setEditingEmail] = useState('');

  
    const handleMenuClick = (event, postId) => {
        setAnchorEl(event.currentTarget);
        setCurrentPostId(postId);
      };
      
    const handleMenuClose = () => {
    setAnchorEl(null);
    };

    const handleEdit = () => {
        setEditingTitle(post?.title ?? '');
        setEditingContent(post?.content ?? '');
        setEditingImage(post?.image ?? '');
        setEditingPrice(post?.price ?? '');
        setEditingLocation(post?.location ?? '');
        setEditingPhoneNumber(post?.phoneNumber ?? '');
        setEditingEmail(post?.email ?? '');
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
                title: editingTitle,
                content: editingContent,
                image: editingImage,
                price: editingPrice,
                location: editingLocation,
                phoneNumber: editingPhoneNumber,
                email: editingEmail
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
                    <Grid>
                        {isEditing ? (
                            <>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <TextField
                                        multiline
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />
                                    <Input
                                        type="file"
                                        onChange={(e) => setEditingImage(e.target.files[0])}
                                        style={{ marginBottom: '8px' }}
                                    />
                                    <TextField
                                        multiline
                                        rows={4}
                                        value={editingContent}
                                        onChange={(e) => setEditingContent(e.target.value)}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />
                                    <TextField
                                        value={editingPrice}
                                        onChange={(e) => setEditingPrice(e.target.value)}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />
                                    <TextField
                                        value={editingLocation}
                                        onChange={(e) => setEditingLocation(e.target.value)}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />

                                    <TextField
                                        value={editingPhoneNumber}
                                        onChange={(e) => setEditingPhoneNumber(e.target.value)}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />
                                    <TextField
                                        value={editingEmail}
                                        onChange={(e) => setEditingEmail(e.target.value)}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSaveEdit}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Typography variant="hero_title" text={isEditing ? undefined : post?.title ?? "N/A"} />

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
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                                >
                                                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                                <MenuItem onClick={() => openDeleteModal(currentPostId)}>Delete</MenuItem>
                                            </Menu>

                                        </>
                                    )}
                                </Grid>

                                <div style={imageContainerStyleCard}>
                                    <img src={post.image || 'https://picsum.photos/200'} alt="Image Description Temp" style={imageStyleCard} />
                                </div>

                                <Divider />

                                <Typography variant="title" text="Brief Description" />
                                <Typography variant="body1" text={post.content ?? "N/A"} />

                                <Divider />

                                <Typography variant="title" text="Listing Information" />

                                <List>
                                    <ListItem>
                                        <Typography variant="body1" text={`Price: ${post.price ?? "N/A"}`} />
                                    </ListItem>
                                    <ListItem>
                                        <Typography variant="body1" text={`Location: ${post.location ?? "N/A"}`} />
                                    </ListItem>
                                    <ListItem>
                                        <Typography variant="body1" text={`Phone Number: ${post.phoneNumber ?? "N/A"}`} />
                                    </ListItem>
                                    <ListItem>
                                        <Typography variant="body1" text={`Email: ${post.email ?? "N/A"}`} />
                                    </ListItem>
                                </List>
                            </>
                        )}

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

export default ListingPage;
