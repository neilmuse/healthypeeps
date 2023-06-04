import React, { useState, useContext } from 'react';
import { Box as MuiBox, Button, Chip, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';
import Box from '../components/box.jsx';
import Typography from '../components/typography.jsx';

import { AuthContext } from '../context/auth-context';
import { authAddPost } from "../auth";

const DiscussionFeed = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState(null);
  
    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      setTitle('');
      setContent('');
      setImage(null);
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();

      const discussionPost = {
        title,
        content,
        image,
        category: "discussion",
        author: user
      };

      try {
        const response = await authAddPost(discussionPost);
        handleCloseModal();
      } catch (error) {
        console.error('Error saving discussion post:', error);
      }
    };
  
    return (
        <>
            <Box>
    
              <Typography variant="title" text={user ? `Hello, ${user.firstName + "!"}` : 'Hello, Guest!'} />
      
              <Button onClick={handleOpenModal} color="primary" variant="contained">Add Discussion</Button>
      
              <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
                  <DialogTitle>Add New Discussion</DialogTitle>
                  <DialogContent>
                  <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                  <TextField fullWidth label="Content" multiline rows={4} value={content} onChange={e => setContent(e.target.value)} />
                  <input type="file" onChange={e => setImage(e.target.files[0])} />
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                  <Button onClick={handleFormSubmit} color="primary" variant="contained">Add</Button>
                  </DialogActions>
              </Dialog>
    

              <Box>
                  <Typography variant="title" text="Discussions" />
              </Box>

            </Box>
        </>
    );
};

export default DiscussionFeed;
