import React, { useEffect, useState, useContext } from 'react';
import { Box as MuiBox, Button, Chip, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';
import Box from '../components/box.jsx';
import Typography from '../components/typography.jsx';

import DiscussionCard from '../views/discussion-card.jsx';

import { AuthContext } from '../context/auth-context';
import { authAddPost, authGetAllPostsByCategory } from "../auth";

const DiscussionFeed = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState(null);

    const [discussions, setDiscussions] = useState([]);

    const category = "discussions";

    useEffect(() => {
      const fetchDiscussions = async () => {
        try {
          let allDiscussions = await authGetAllPostsByCategory(category);
          // Sort discussions from newest to oldest
          allDiscussions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setDiscussions(allDiscussions);
        } catch (error) {
          console.error('Error fetching discussions:', error);
        }
      };
    
      fetchDiscussions();
    }, []);
  
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
        setDiscussions(prevDiscussions => [response, ...prevDiscussions]);  //adding the new post at the start of the array
      } catch (error) {
        console.error('Error saving discussion post:', error);
      }
    };
  
    return (
        <>
            <Box>

              <Container maxWidth="md">

                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  style={{ minHeight: '100vh' }}
                >

                  <Grid item>
                    <Typography variant="title" text={user ? `Hello, ${user.firstName + "!"}` : 'Hello, Guest!'} />
        
                    {user ? (
                      <Button onClick={handleOpenModal} color="primary" variant="contained"> Add Discussion </Button>
                    ): null }
                    
            
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
                      {discussions.map((discussion) => (
                        <DiscussionCard key={discussion._id} title={discussion.title} image={discussion.image} author={discussion.author} createdAt={discussion.createdAt} content={discussion.content} />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
        </>
    );
};

export default DiscussionFeed;
