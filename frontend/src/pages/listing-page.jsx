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

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [priceError, setPriceError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const [titleHelperText, setTitleHelperText] = useState('');
    const [contentHelperText, setContentHelperText] = useState('');
    const [priceHelperText, setPriceHelperText] = useState('');
    const [locationHelperText, setLocationHelperText] = useState('');
    const [emailHelperText, setEmailHelperText] = useState('');
    const [phoneNumberHelperText, setPhoneNumberHelperText] = useState('');

  
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
        NAVIGATE('/');
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
        } else {
            setTitleError(false);
            setTitleHelperText("");
        }
    
        if (!editingContent.trim()) { // Check if content is empty
            setContentError(true);
            setContentHelperText("Content is required");
            isValid = false;
        } else {
            setContentError(false);
            setContentHelperText("");
        }
    
        // Regular expression to match a simple price format (numbers, optional decimal points)
        const pricePattern = /^\d+(\.\d{1,2})?$/;
        if (!pricePattern.test(editingPrice)) { // Check if price is in the correct format
            setPriceError(true);
            setPriceHelperText("Enter a valid price (e.g. 123 or 123.45)");
            isValid = false;
        } else {
            setPriceError(false);
            setPriceHelperText("");
        }
    
        if (!editingLocation.trim()) { // Check if location is empty
            setLocationError(true);
            setLocationHelperText("Location is required");
            isValid = false;
        } else {
            setLocationError(false);
            setLocationHelperText("");
        }
    
        // Regular expression to match a simple email format
        const emailPattern = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (!emailPattern.test(editingEmail)) { // Check if email is in the correct format
            setEmailError(true);
            setEmailHelperText("Enter a valid email address");
            isValid = false;
        } else {
            setEmailError(false);
            setEmailHelperText("");
        }
    
        // Regular expression to match a simple phone number format
        const phoneNumberPattern = /^(09|\+639)\d{9}$/;
        if (!phoneNumberPattern.test(editingPhoneNumber)) { // Check if phone number is in the correct format
            setPhoneNumberError(true);
            setPhoneNumberHelperText("Enter a valid PH phone number.");
            isValid = false;
        } else {
            setPhoneNumberError(false);
            setPhoneNumberHelperText("");
        }
    
        if (!isValid) {
            return;
        }

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

    const handleCancelEdit = () => {
        setIsEditing(false);
        setTitleError(false);
        setContentError(false);
        setTitleHelperText('');
        setContentHelperText('');
        setPriceHelperText('');
        setLocationHelperText('');
        setPhoneNumberHelperText('');
        setEmailHelperText('');
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
                                    <TextField
                                        label="Price"
                                        placeholder="Enter listing price"
                                        error={priceError}
                                        helperText={priceHelperText}
                                        value={editingPrice}
                                        onChange={(e) => {
                                            setPriceError(false);
                                            setPriceHelperText('');
                                            setEditingPrice(e.target.value);
                                        }}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />
                                    <TextField
                                        label="Location"
                                        placeholder="Enter listing location"
                                        error={locationError}
                                        helperText={locationHelperText}
                                        value={editingLocation}
                                        onChange={(e) => {
                                            setLocationError(false);
                                            setLocationHelperText('');
                                            setEditingLocation(e.target.value);
                                        }}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />

                                    <TextField
                                        label="Phone Number"
                                        placeholder="Enter phone number"
                                        error={phoneNumberError}
                                        helperText={phoneNumberHelperText}
                                        value={editingPhoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumberError(false);
                                            setPhoneNumberHelperText('');
                                            setEditingPhoneNumber(e.target.value);
                                        }}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />

                                    <TextField
                                        label="Email"
                                        placeholder="Enter email"
                                        error={emailError}
                                        helperText={emailHelperText}
                                        value={editingEmail}
                                        onChange={(e) => {
                                            setEmailError(false);
                                            setEmailHelperText('');
                                            setEditingEmail(e.target.value);
                                        }}
                                        variant="outlined"
                                        style={{ width: '100%', marginBottom: '8px' }}
                                    />

                                    <div>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ marginRight: '8px' }}
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        variant="contained" color="primary" 
                                        onClick={handleSaveEdit}>
                                        Save
                                    </Button>
                                    </div>
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
