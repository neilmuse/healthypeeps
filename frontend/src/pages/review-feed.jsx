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

    const [reviews, setReviews] = useState([]);

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

    const handleSearch = (query) => {
      setSearchQuery(query.toLowerCase());
    };
  
    const filteredReviews = reviews.filter(review =>
      review.title.toLowerCase().includes(searchQuery)
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
                      <Button onClick={handleOpenModal} color="primary" variant="contained"> Add Review </Button>
                    ): null }
                    
            
                    <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
                        <DialogTitle>Add New Review</DialogTitle>
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
                      <Typography variant="title" text="Reviews" />
                      {filteredReviews.length > 0 ? (
                        reviews.map((review) => (
                          <ReviewCard key={review._id} reviewId={review._id} title={review.title} image={review.image} author={review.author} createdAt={review.createdAt} content={review.content} />
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
