import React, { useContext, useEffect, useState } from 'react';
import {
    Box as MUIBox,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputLabel,
    Link,
    List,
    ListItem,
    Select,
    Menu,
    MenuItem,
    TextField
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

import { AuthContext } from '../context/auth-context';

import { imageStyleCard, imageContainerStyleCard, modalStyle } from '../constants/styles';

import { authEditPost, authDeletePost, authGetSpecificPostById } from '../auth';

const RecipePage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const NAVIGATE = useNavigate();
    const units = ['g', 'mg', 'ml', 'oz', 'cup', 'tbsp', 'tsp', 'lb', 'pieces'];

    const [post, setPost] = useState(null);

    const [anchorEls, setAnchorEls] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(post?.title ?? '');
    const [editingContent, setEditingContent] = useState(post?.content ?? '');
    const [editingImage, setEditingImage] = useState(post?.image ?? '');
    const [editingPreparationTime, setEditingPreparationTime] = useState(post?.preparationTime ?? '');
    const [editingIngredients, setEditingIngredients] = useState(post?.ingredients ?? []);
    const [editingMacros, setEditingMacros] = useState(post?.macros ?? {});
    const [editingPreparation, setEditingPreparation] = useState(post?.preparation ?? []);

    const [errors, setErrors] = useState({});
    const [helperTexts, setHelperTexts] = useState({});

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
        setEditingPreparationTime(post?.preparationTime ?? '');
        setEditingIngredients(post?.ingredients ?? []);
        setEditingMacros(post?.macros ?? {});
        setEditingPreparation(post?.preparation ?? []);
        setIsEditing(true);
        handleMenuClose();
    };

    const validateIngredient = (ingredient, index) => {
        let newErrors = { ...errors };
        let newHelperTexts = { ...helperTexts };
    
        if (!newErrors.ingredients) {
          newErrors.ingredients = [];
        }
        if (!newHelperTexts.ingredients) {
          newHelperTexts.ingredients = [];
        }
    
        // Validation for ingredient name
        if (!ingredient.name.trim() || !/^[A-Za-z\s]+$/.test(ingredient.name)) {
            newErrors.ingredients[index] = { ...newErrors.ingredients[index], name: true };
            if (!ingredient.name.trim()) {
                newHelperTexts.ingredients[index] = { ...newHelperTexts.ingredients[index], name: 'Name is required' };
            } else {
                newHelperTexts.ingredients[index] = { ...newHelperTexts.ingredients[index], name: 'Name can only contain letters and spaces' };
            }
        } else {
            newErrors.ingredients[index] = { ...newErrors.ingredients[index], name: false };
            newHelperTexts.ingredients[index] = { ...newHelperTexts.ingredients[index], name: '' };
        }    

        // Validation for amount
        if (!ingredient.amount || isNaN(ingredient.amount) || ingredient.amount <= 0) {
            newErrors.ingredients[index] = { ...newErrors.ingredients[index], amount: true };
            newHelperTexts.ingredients[index] = { ...newHelperTexts.ingredients[index], amount: 'Amount must be a positive number' };
        } else {
            newErrors.ingredients[index] = { ...newErrors.ingredients[index], amount: false };
            newHelperTexts.ingredients[index] = { ...newHelperTexts.ingredients[index], amount: '' };
        }
    
        // Add more validations here for unit and amount
    
        setErrors(newErrors);
        setHelperTexts(newHelperTexts);
    };

    const validateMacros = (key, value) => {
        let newErrors = { ...errors };
        let newHelperTexts = { ...helperTexts };
    
        if (!newErrors.macros) {
            newErrors.macros = {};
        }
        if (!newHelperTexts.macros) {
            newHelperTexts.macros = {};
        }
    
        // Validation for macros - you can add more conditions based on your requirements
        if (!value || isNaN(value) || value <= 0) {
            newErrors.macros[key] = true;
            newHelperTexts.macros[key] = 'Value must be a positive number';
        } else {
            newErrors.macros[key] = false;
            newHelperTexts.macros[key] = '';
        }

        editingPreparation.forEach((step, index) => {
            if (!step.trim()) {
                newErrors = { ...newErrors, preparationSteps: { ...newErrors.preparationSteps, [index]: true }};
                newHelperTexts = { ...newHelperTexts, preparationSteps: { ...newHelperTexts.preparationSteps, [index]: 'Step cannot be empty' }};
            }
        });        
    
        setErrors(newErrors);
        setHelperTexts(newHelperTexts);
    };    

    const validateForm = () => {
        let newErrors = {};
        let newHelperTexts = {};
    
        if (!editingTitle.trim()) {
          newErrors.title = true;
          newHelperTexts.title = "Title is required.";
        }
    
        if (editingContent.trim() === '') {
            newErrors.content = true;
            newHelperTexts.content = "Content is required.";
        }
    
        if (editingIngredients.length === 0) {
            newErrors.editingIngredients = true;
            newHelperTexts.ingredients = "At least one ingredient is required.";
        }
    
        if (editingPreparation.length === 0) {
            newErrors.preparationSteps = true;
            newHelperTexts.preparationSteps = "At least one preparation step is required.";
        }
    
        editingIngredients.forEach((ingredient, index) => {
            validateIngredient(ingredient, index);
        });
    
        if (editingPreparationTime == null || editingPreparationTime === '' || isNaN(editingPreparationTime) || editingPreparationTime < 0) {
            newErrors.preparationTime = true;
            if (editingPreparationTime == null || editingPreparationTime === '') {
                newHelperTexts.preparationTime = "Preparation time is required.";
            } else {
                newHelperTexts.preparationTime = "Preparation time should be a positive number.";
            }
        }

        Object.entries(editingMacros ?? {}).forEach(([key, value]) => {
            validateMacros(key, value);
        });
        
        setErrors(newErrors);
        setHelperTexts(newHelperTexts);
    
        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveEdit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            const updatedPostData = {
                title: editingTitle,
                content: editingContent,
                image: editingImage,
                preparationTime: editingPreparationTime,
                macros: editingMacros,
                preparation: editingPreparation,
                ingredients: editingIngredients
            };
            const updatedPost = await authEditPost(post._id, updatedPostData);
            setPost(updatedPost);
            setIsEditing(false);
        } catch (error) {
            console.error("Error editing post: ", error);
        }

        setErrors({});
        setHelperTexts({});
    };

    const handleCancelEdit = () => {
        setErrors({});
        setHelperTexts({});
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
                                    label="Title"
                                    value={editingTitle}
                                    error={errors.title}
                                    helperText={helperTexts.title}
                                    onChange={(e) => {
                                    setEditingTitle(e.target.value);
                                    setErrors({ ...errors, title: false });
                                    setHelperTexts({ ...helperTexts, title: '' });
                                }}
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

                        <div style={imageContainerStyleCard}>
                            <img src={post.image || 'https://picsum.photos/200'} alt="Image Description Temp" style={imageStyleCard} />
                        </div>

                        <Divider />

                        {isEditing ? (
                            <TextField
                                label="Content"
                                value={editingContent}
                                error={errors.content}
                                helperText={helperTexts.content}
                                onChange={(e) => {
                                setEditingContent(e.target.value);
                                setErrors({ ...errors, content: false });
                                setHelperTexts({ ...helperTexts, content: '' });
                                }}
                            />
                        ) : (
                            <>
                                <Typography variant="title" text="Brief Description" />
                                <Typography variant="body1" text={post.content ?? "N/A"} />
                            </>
                        )}

                        <Divider />

                        {isEditing ? (
                            <TextField
                                label="Preparation Time"
                                value={editingPreparationTime}
                                error={errors.preparationTime}
                                helperText={helperTexts.preparationTime}
                                onChange={(e) => {
                                setEditingPreparationTime(e.target.value);
                                setErrors({ ...errors, preparationTime: false });
                                setHelperTexts({ ...helperTexts, preparationTime: '' });
                                }}
                            />
                        ) : (
                            <>
                                <Typography variant="title" text="Preparation Time (in minutes)" />
                                <Typography variant="body1" text={post.preparationTime ?? "N/A"} />
                            </>
                        )}

                        <Divider />

                        <Typography variant="title" text="Ingredients" />

                        <List
                            sx={{
                            listStyleType: 'disc',
                            pl: 2,
                            '& .MuiListItem-root': {
                                display: 'list-item',
                            },
                            }}
                        >
                            {isEditing ? 
                                (editingIngredients ?? []).map(({ name, unit, amount }, index) => (
                                    <ListItem key={index}>
                                        <TextField
                                            label="Name"
                                            value={name}
                                            error={errors.ingredients?.[index]?.name}
                                            helperText={helperTexts.ingredients?.[index]?.name}
                                            onChange={(e) => {
                                                const updatedIngredients = [...editingIngredients];
                                                updatedIngredients[index].name = e.target.value;
                                                setEditingIngredients(updatedIngredients);

                                                // Validate ingredient after change
                                                validateIngredient(updatedIngredients[index], index);
                                            }}
                                        />

                                        <FormControl>
                                            <InputLabel htmlFor={`unit-select-${index}`}>Unit</InputLabel>
                                            <Select
                                                value={unit}
                                                onChange={(e) => {
                                                    const updatedIngredients = [...editingIngredients];
                                                    updatedIngredients[index].unit = e.target.value;
                                                    setEditingIngredients(updatedIngredients);
                                                }}
                                                label="Unit"
                                                inputProps={{
                                                    name: 'unit',
                                                    id: `unit-select-${index}`,
                                                }}
                                            >
                                                {units.map((unitOption) => (
                                                    <MenuItem value={unitOption} key={unitOption}>
                                                        {unitOption}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            label="Amount"
                                            value={amount}
                                            error={errors.ingredients?.[index]?.amount}
                                            helperText={helperTexts.ingredients?.[index]?.amount}
                                            onChange={(e) => {
                                                const updatedIngredients = [...editingIngredients];
                                                updatedIngredients[index].amount = e.target.value;
                                                setEditingIngredients(updatedIngredients);

                                                // Validate ingredient after change
                                                validateIngredient(updatedIngredients[index], index);
                                            }}
                                        />

                                    </ListItem>
                                ))
                                : (post.ingredients ?? []).map(({ name, unit, amount }) => (
                                    <ListItem>
                                        <Typography variant="body1" text={`${amount ?? "N/A"} ${unit ?? "N/A"} ${name ?? "N/A"}`} />
                                    </ListItem>
                                ))}
                        </List>


                        <Divider />

                        <Typography variant="title" text="Macronutrients" />

                        <MUIBox
                            sx={{ backgroundColor: COLORS.LIGHT_GREEN }}
                        >
                            <Grid container spacing={2} p={3} justifyContent="center" alignItems="center">
                                {isEditing
                                    ? Object.entries(editingMacros ?? {}).map(([key, value], index) => (
                                        <Grid item key={index} xs={6} sm={3}>
                                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                                <Grid item>
                                                    <TextField
                                                        value={value}
                                                        error={errors.macros?.[key]}
                                                        helperText={helperTexts.macros?.[key]}
                                                        onChange={(e) => {
                                                            setEditingMacros({
                                                                ...editingMacros,
                                                                [key]: e.target.value
                                                            });
                                                            // Validate macros after change
                                                            validateMacros(key, e.target.value);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1" text={key} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))
                                    : Object.entries(post.macros ?? {}).map(([key, value], index) => (
                                        <Grid item key={index} xs={6} sm={3}>
                                            <Grid container direction="column" alignItems="center" justifyContent="center">
                                                <Grid item>
                                                    <Typography variant="body_bold" text={value ?? "N/A"} />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1" text={key ?? "N/A"} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                            </Grid>
                        </MUIBox>

                        <Divider />

                        <Typography variant="title" text="Preparation" />

                        <Grid container direction="column">
                            {isEditing
                                ? (editingPreparation ?? []).map((step, index) => (
                                    <Grid item key={index}>
                                        <TextField
                                            fullWidth
                                            label={`Step ${index + 1}`}
                                            value={step}
                                            error={errors.preparationSteps?.[index]} // <-- Added error
                                            helperText={helperTexts.preparationSteps?.[index]} // <-- Added helperText
                                            onChange={(e) => {
                                                const updatedSteps = [...editingPreparation];
                                                updatedSteps[index] = e.target.value;
                                                setEditingPreparation(updatedSteps);
                                            }}
                                        />
                                    </Grid>
                                ))
                                : (post.preparation ?? []).map((step, index) => (
                                    <Grid item key={index}>
                                        <Typography variant="body1" text={`Step ${index + 1}: ${step}`} />
                                    </Grid>
                                ))}
                        </Grid>

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

export default RecipePage;