import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, Collapse, TextField, Button, IconButton, Modal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import COLORS from '../constants/colors.js';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useNavigate } from 'react-router-dom'; 

import Typography from '../components/typography.jsx';

import ConvertTime from '../utils/moment.jsx';

import Divider from '../components/divider.jsx';

import { imageStyleCard, imageContainerStyleCard, modalStyle } from '../constants/styles';

import { AuthContext } from '../context/auth-context';

import { authAddComment, authGetUserById } from "../auth";

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

const ListingCard = ({ listingId, title, image, author, createdAt, content, location, price, phoneNumber, email, postId, authorId }) => {
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
            postId: listingId,
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
        NAVIGATE(`/listing/${listingId}`);
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
                    <Divider/>
                    <Typography variant="body1" text={`Location: ${location}`} />
                    <Typography variant="body1" text={`Price: ${price}`} />
                    <Typography variant="body1" text={`Phone Number: ${phoneNumber}`} />
                    <Typography variant="body1" text={`Email: ${email}`} />
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ListingCard;
