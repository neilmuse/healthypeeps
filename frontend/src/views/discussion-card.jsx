import React, { useContext, useState } from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, Collapse, TextField, Button, IconButton, Modal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import COLORS from '../constants/colors.js';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Typography from '../components/typography.jsx';

import ConvertTime from '../utils/moment.jsx';

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

const DiscussionCard = ({ discussionId, title, image, author, createdAt, content }) => {
    const { user } = useContext(AuthContext);
    const [expanded, setExpanded] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const commentData = {
            content: newComment,
            postId: discussionId,
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

    return (
        <Card>
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
                <img src={image || 'https://picsum.photos/200'} alt="Image Description Temp" style={imageStyleCard} />
            </div>

            <CardContent>
                <Typography variant="body1" text={content} />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={handleOpen}>
                  <CommentIcon />
                </IconButton>
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
                <Typography variant="body1" text="More:" />
                </CardContent>
            </Collapse>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: COLORS.GREEN }}>
                                {author?.firstName?.substr(0, 1)}
                                </Avatar>
                            }
                            title={title}
                            subheader={ConvertTime(createdAt)}
                        />
                        <CardContent>
                            <Typography variant="body1" text={content} />
                        </CardContent>
                        <CardActions disableSpacing>
                            <TextField
                                label="New Comment"
                                value={newComment}
                                onChange={(event) => setNewComment(event.target.value)} // Use setNewComment here
                            />
                            <Button onClick={handleSubmit}>Send</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>
        </Card>
    );
};

export default DiscussionCard;
