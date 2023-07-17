import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, Collapse, TextField, Button, IconButton, Modal, Box } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import COLORS from '../constants/colors.js';

import Typography from '../components/typography.jsx';
import Divider from '../components/divider.jsx';

import ConvertTime from '../utils/moment.jsx';

import { imageStyleCard, imageContainerStyleCard, modalStyle } from '../constants/styles';

import { AuthContext } from '../context/auth-context';

import { authAddComment, authGetUserById } from "../auth";

const ReviewCard = ({ reviewId, title, image, author, createdAt, content }) => {
    const { user } = useContext(AuthContext);
    const NAVIGATE = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [authorData, setAuthor] = useState(null);

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

    useEffect(() => {
        const fetchAuthor = async () => {
          try {
            const userData = await authGetUserById(author);
            setAuthor(userData);
          } catch (error) {
            console.error("Error fetching author data:", error);
          }
        };
  
        fetchAuthor();
    }, [author]); 

    return (
        <Card>
            <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <CardHeader
                    avatar={
                    <Avatar sx={{ bgcolor: COLORS.GREEN}} >
                        {authorData && (authorData.firstName[0] + authorData.lastName[0]).toUpperCase()}
                    </Avatar>
                    }
                    
                    title={<Typography variant="cardtitle" text={title} />}
                    subheader={<Typography variant="cardsubheader" text={authorData?.firstName + " " + authorData?.lastName + " " + "· " + ConvertTime(createdAt)} />}
                />

                <div style={imageContainerStyleCard}>
                    {image && <img src={image} alt="Image Description Temp" style={imageStyleCard} />}
                </div>

                <CardContent>
                    <Typography variant="body1" text={content} />
                </CardContent>

            </div>

        </Card>
    );
};

export default ReviewCard;
