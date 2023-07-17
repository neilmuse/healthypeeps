import React, { useEffect, useState, useContext } from 'react';
import { Alert, Snackbar, Box as MuiBox, Button, Chip, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';
import Box from '../components/box.jsx';
import Typography from '../components/typography.jsx';

import ListingCard from '../views/listing-card.jsx';
import SearchField from '../components/search-field.jsx';
import Divider from '../components/divider.jsx';

import { AuthContext } from '../context/auth-context';
import { authAddPost, authGetAllPostsByCategory, authUploadFile } from "../auth";

const ListingFeed = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [price, setPrice] = useState('');
    const [refetchTrigger, setRefetchTrigger] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);

    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [priceError, setPriceError] = useState('');

    const [listings, setListings] = useState([]);
    const [sortOrder, setSortOrder] = useState('date');

    const category = "listings";

    useEffect(() => {
        const fetchListings = async () => {
            try {
                let allListings = await authGetAllPostsByCategory(category);
                // Sort listings from newest to oldest
                allListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setListings(allListings);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
            };

            fetchListings();
    }, []);
  
    const handleOpenModal = () => {
        setModalOpen(true);
    };
  
    const handleCloseModal = () => {
        setModalOpen(false);
        
        // Reset fields
        setTitle('');
        setContent('');
        setImage(null);
        setLocation('');
        setEmail('');
        setPhoneNumber('');
        setPrice('');
    
        // Reset helper texts
        setTitleError('');
        setContentError('');
        setLocationError('');
        setEmailError('');
        setPhoneNumberError('');
        setPriceError('');
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

        if (location.trim() === '') {
            setLocationError('Location is required.');
            isValid = false;
        } else {
            setLocationError('');
        }

        const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (!email.match(emailRegex)) {
            setEmailError('Please enter a valid email.');
            isValid = false;
        } else {
            setEmailError('');
        }

        const phoneNumberRegex = /^(09|\+639)\d{9}$/;
        if (!phoneNumber.match(phoneNumberRegex)) {
            setPhoneNumberError('Please enter a valid PH phone number.');
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        if (isNaN(price) || price <= 0) {
            setPriceError('Please enter a valid price.');
            isValid = false;
        } else {
            setPriceError('');
        }

        return isValid;
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

        if (!validateForm()) {
            return;
        }

        const listingPost = {
            title,
            content,
            image: uploadedImageUrl,
            category: "listing",
            author: user,
            location,
            email,
            phoneNumber,
            price,
      };

        try {
            const response = await authAddPost(listingPost);
            handleCloseModal();
            setListings(prevListings => [response, ...prevListings]);  //adding the new post at the start of the array
            setRefetchTrigger(prev => !prev);
            setSuccessAlertOpen(true); // Open the success alert
        } catch (error) {
            console.error('Error saving listing post:', error);
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
    
    // First, filter the reviews
    const filteredListings = listings.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    // Next, sort the filtered listings
    let sortedListings = filteredListings;

    switch (sortOrder) {
    case 'alphabetical':
        sortedListings = sortedListings.sort((a, b) => a.title.localeCompare(b.title));
        break;
    case 'reverseAlphabetical':
        sortedListings = sortedListings.sort((a, b) => b.title.localeCompare(a.title));
        break;
    case 'date':
        sortedListings = sortedListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
                        <Button onClick={handleOpenModal} color="primary" variant="contained"> Add Listing </Button>
                      ): null }
                    </Grid>

                    <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
                        <DialogTitle>Add New Listing</DialogTitle>
                        <DialogContent>
                            <TextField
                                fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} error={!!titleError} helperText={titleError}
                            />

                            <TextField
                                fullWidth label="Content" value={content} multiline rows={4} onChange={e => setContent(e.target.value)} error={!!contentError} helperText={contentError}
                            />
                            <TextField 
                                fullWidth label="Location" value={location} onChange={e => setLocation(e.target.value)} error={!!locationError} helperText={locationError}
                            />
                            <TextField 
                                fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} error={!!emailError} helperText={emailError} 
                            />
                            <TextField 
                                fullWidth label="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} error={!!phoneNumberError} helperText={phoneNumberError}
                            />
                            <TextField 
                                fullWidth label="Price" value={price} onChange={e => setPrice(e.target.value)} error={!!priceError} helperText={priceError}
                            />
                            <input type="file" onChange={e => setImage(e.target.files[0])} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                            <Button onClick={handleFormSubmit} color="primary" variant="contained">Add</Button>
                        </DialogActions>
                    </Dialog>

                    <Box value={3}>
                      <Typography variant="title" text="Listings" />
                        {filteredListings.length > 0 ? (
                            filteredListings.map((listing) => (
                                <Box key={listing._id} marginBottom={1} value={3}>
                                    <ListingCard 
                                        key={listing._id}
                                        listingId={listing._id}
                                        title={listing.title} 
                                        image={listing.image} 
                                        author={listing.author} 
                                        createdAt={listing.createdAt} 
                                        content={listing.content} 
                                        location={listing.location} 
                                        email={listing.email} 
                                        phoneNumber={listing.phoneNumber} 
                                        price={listing.price}
                                        authorId={listing.author}
                                        postId={listing._id}
                                    />
                                </Box>
                        ))) : (
                            <Typography variant="body" text="No listings found." />
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

export default ListingFeed;
