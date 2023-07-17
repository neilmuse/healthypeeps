import React, { useContext, useState } from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, Collapse, TextField, Button, IconButton, Modal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import COLORS from '../constants/colors.js';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Typography from '../components/typography.jsx';

import ConvertTime from '../utils/moment.jsx';

import { useNavigate } from 'react-router-dom'; 

import { imageStyleCard, imageContainerStyleCard, modalStyle } from '../constants/styles';

import { AuthContext } from '../context/auth-context';

import { authAddComment } from "../auth";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
        })(({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
    }),
}));

const RecipeCard = ({ recipeId, title, image, author, createdAt, content, macronutrients }) => {
    const { user } = useContext(AuthContext);
    const NAVIGATE = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const commentData = {
            content: newComment,
            postId: recipeId,
            authorId: user._id
        };
    
        try {
            const response = await authAddComment(commentData);
            setNewComment(''); // Clear the comment input
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCardClick = () => {
        NAVIGATE(`/recipe/${recipeId}`);
    };

    return (
        <Card>
            <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: COLORS.GREEN}} >
                        {author?.firstName?.substr(0, 1)}
                    </Avatar>
                    }

                    title={<Typography variant="cardtitle" text={title} />}
                    subheader={<Typography variant="cardsubheader" text={ConvertTime(createdAt)} />}
                />

                <div style={imageContainerStyleCard}>
                    {image && <img src={image} alt="Image Description Temp" style={imageStyleCard} />}
                </div>

                <CardContent>
                    <Typography variant="body1" text={content} />
                </CardContent>

            </div>

            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="cardtitle" text={"Macronutrients:"} />
                    <Typography variant="body1" text={`Protein: ${macronutrients.protein} g`} />
                    <Typography variant="body1" text={`Calories: ${macronutrients.calories} cal`} />
                    <Typography variant="body1" text={`Carbs: ${macronutrients.carbs} g`} />
                </CardContent>
            </Collapse>

        </Card>
    );
};

export default RecipeCard;