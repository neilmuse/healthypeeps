import React, { useEffect, useState, useContext } from 'react';
import { Alert, Snackbar, Box as MuiBox, Button, Chip, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';
import Box from '../components/box.jsx';
import Typography from '../components/typography.jsx';

import ReviewCard from '../views/review-card.jsx';
import SearchField from '../components/search-field.jsx';
import Divider from '../components/divider.jsx';

import { AuthContext } from '../context/auth-context';
import { authAddPost, authGetAllPostsByCategory, authUploadFile } from "../auth";

const ReviewFeed = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [refetchTrigger, setRefetchTrigger] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    const [reviews, setReviews] = useState([]);
    const [sortOrder, setSortOrder] = useState('date');

    const category = "reviews";

    useEffect(() => {
      const fetchReviews = async () => {
        try {
          let allReviews = await authGetAllPostsByCategory(category);
          // Sort reviews from newest to oldest
          allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setReviews(allReviews);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
    
      fetchReviews();
    }, []);
  
    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
      setTitle('');
      setContent('');
      setImage(null);
    
      // Reset error states
      setTitleError('');
      setContentError('');
    };

    const validateForm = () => {
      let isValid = true;
  
      if (title.trim() === '') {
          setTitleError('Title is required.');
          isValid = false;
      } else {
          setTitleError('');
      }
  
      if (content.trim() === '') {
          setContentError('Content is required.');
          isValid = false;
      } else {
          setContentError('');
      }

      return isValid;
    }
  
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

      if (!validateForm()) {
        return;
      }
  
      const reviewPost = {
          title,
          content,
          image: uploadedImageUrl,
          category: "review",
          author: user
      };
  
      try {
          const response = await authAddPost(reviewPost);
          handleCloseModal();
          setReviews(prevReviews => [response, ...prevReviews]);  //adding the new post at the start of the array
          setRefetchTrigger(prev => !prev);
          setSuccessAlertOpen(true); // Open the success alert
        } catch (error) {
          console.error('Error saving review post:', error);
      }
    };

    const handleSuccessAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSuccessAlertOpen(false);
    };

    const handleSortChange = (event) => {
      setSortOrder(event.target.value);
    };

    const handleSearch = (query) => {
      setSearchQuery(query.toLowerCase());
    };

      // First, filter the reviews
    const filteredReviews = reviews.filter(review =>
      review.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Next, sort the filtered reviews
    let sortedReviews = filteredReviews;

    switch (sortOrder) {
      case 'alphabetical':
        sortedReviews = sortedReviews.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'reverseAlphabetical':
        sortedReviews = sortedReviews.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'date':
        sortedReviews = sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
  
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

                    <Box value={2}>
                      <FormControl>
                          <InputLabel>Sort by</InputLabel>
                          <Select value={sortOrder} onChange={handleSortChange}>
                              <MenuItem value={'date'}>Newest</MenuItem>
                              <MenuItem value={'alphabetical'}>A-Z</MenuItem>
                              <MenuItem value={'reverseAlphabetical'}>Z-A</MenuItem>
                          </Select>
                      </FormControl>
                    </Box>

                    <Grid item> 
                      {user ? (
                        <Button onClick={handleOpenModal} color="primary" variant="contained"> Add Review </Button>
                      ): null }
                    </Grid>
            
                    <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
                        <DialogTitle>Add New Review</DialogTitle>
                        <DialogContent>
                          <TextField
                              fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} error={!!titleError} helperText={titleError}
                          />

                          <TextField
                              fullWidth label="Content" value={content} multiline rows={4} onChange={e => setContent(e.target.value)} error={!!contentError} helperText={contentError}
                          />
                          <input type="file" onChange={e => setImage(e.target.files[0])} />
                        </DialogContent>

                        <DialogActions>
                          <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                          <Button onClick={handleFormSubmit} color="primary" variant="contained">Add</Button>
                        </DialogActions>
                    </Dialog>

                    <Box value={3}>
                      <Typography variant="title" text="Reviews" />
                      {filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (
                          <Box key={review._id} marginBottom={1} value={3}>
                            <ReviewCard key={review._id} reviewId={review._id} title={review.title} image={review.image} author={review.author} createdAt={review.createdAt} content={review.content} />
                          </Box>
                      ))) : (
                        <Typography variant="body" text="No reviews found." />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            <Snackbar open={successAlertOpen} autoHideDuration={5000} onClose={handleSuccessAlertClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleSuccessAlertClose} severity="success" sx={{ width: '100%' }}>
                    Post successfully added!
                </Alert>
            </Snackbar>
        </>
    );
};

export default ReviewFeed;
