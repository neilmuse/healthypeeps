import React, { useEffect, useState, useContext } from 'react';
import { Box as MuiBox, Button, Chip, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';
import Box from '../components/box.jsx';
import Typography from '../components/typography.jsx';

import DiscussionCard from '../views/discussion-card.jsx';
import SearchField from '../components/search-field.jsx';
import Divider from '../components/divider.jsx';

import { AuthContext } from '../context/auth-context';
import { authAddPost, authGetAllPostsByCategory, authUploadFile } from "../auth";

const DiscussionFeed = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

    let uploadedImageUrl = null;

    if (image) {
        try {
            const uploadedFileResponse = await authUploadFile(image);
            uploadedImageUrl = uploadedFileResponse.url; // Store the URL from the response
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    const discussionPost = {
      title,
      content,
      image: uploadedImageUrl,
      category: "discussion",
      author: user
    };

    try {
      const response = await authAddPost(discussionPost);
      handleCloseModal();
      setDiscussions(prevDiscussions => [response, ...prevDiscussions]);  //adding the new post at the start of the array
      setRefetchTrigger(prev => !prev);
    } catch (error) {
      console.error('Error saving discussion post:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchQuery)
  );

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
                  
                  <Grid item>
                    <SearchField category={category} triggerRefetch={refetchTrigger} onSearch={handleSearch} />
                  </Grid>

                  <Divider />

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
                  

                  <Box value={3}>
                    <Typography variant="title" text="Discussions" />
                    {filteredDiscussions.length > 0 ? (
                      filteredDiscussions.map((discussion) => (
                        <DiscussionCard key={discussion._id} discussionId={discussion._id} title={discussion.title} image={discussion.image} author={discussion.author} createdAt={discussion.createdAt} content={discussion.content} />
                      ))
                    ) : (
                      <Typography variant="body" text="No discussions found." />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
      </>
  );
};

export default DiscussionFeed;
