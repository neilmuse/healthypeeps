import * as React from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, Collapse, TextField, Button, IconButton, Modal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import COLORS from '../constants/colors.js';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Typography from '../components/typography.jsx';

import ConvertTime from '../utils/moment.jsx';

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

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', // adjust the width as necessary
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


const DiscussionCard = ({ title, image, author, createdAt, content }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleSendComment = () => {
        setComments([...comments, newComment]);
        setNewComment('');
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Card>
            <img src={image} />
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: COLORS.GREEN}} >
                    {author?.firstName?.substr(0, 1)}
                </Avatar>
                }

                title={<Typography variant="cardtitle" text={title} />}
                subheader={<Typography variant="cardsubheader" text={ConvertTime(createdAt)} />}
            />
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
                            onChange={(event) => setNewComment(event.target.value)}
                        />
                        <Button onClick={handleSendComment}>Send</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>

        </Card>
    );
};

export default DiscussionCard;
