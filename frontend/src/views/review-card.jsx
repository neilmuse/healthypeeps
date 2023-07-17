import React, { useContext, useState } from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, Collapse, TextField, Button, IconButton, Modal, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import COLORS from '../constants/colors.js';

import Typography from '../components/typography.jsx';
import Divider from '../components/divider.jsx';

import ConvertTime from '../utils/moment.jsx';

import { imageStyleCard, imageContainerStyleCard, modalStyle } from '../constants/styles';

import { AuthContext } from '../context/auth-context';

import { authAddComment } from "../auth";

const ReviewCard = ({ reviewId, title, image, author, createdAt, content }) => {
    const { user } = useContext(AuthContext);
    const NAVIGATE = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const commentData = {
            content: newComment,
            postId: reviewId,
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
        NAVIGATE(`/review/${reviewId}`);
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
                    <img src={image || 'https://cdn-icons-png.flaticon.com/512/3799/3799666.png'} alt="Image Description Temp" style={imageStyleCard} />
                </div>


                <CardContent>
                    <Typography variant="body1" text={content} />
                </CardContent>

            </div>

        </Card>
    );
};

export default ReviewCard;
