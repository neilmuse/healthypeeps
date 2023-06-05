import React, { useEffect, useState, useContext } from 'react';
import { Box as MuiBox, Button, Chip, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';
import Box from '../components/box.jsx';
import Typography from '../components/typography.jsx';

import ListingCard from '../views/listing-card.jsx';

import { AuthContext } from '../context/auth-context';
import { authAddPost, authGetAllPostsByCategory } from "../auth";

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

    const [listings, setListings] = useState([]);

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
        setTitle('');
        setContent('');
        setImage(null);
        setLocation('');
        setEmail('');
        setPhoneNumber('');
        setPrice('');
    };
  
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const listingPost = {
        title,
        content,
        image,
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
        } catch (error) {
            console.error('Error saving listing post:', error);
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
                      <Button onClick={handleOpenModal} color="primary" variant="contained"> Add Listing </Button>
                    ): null }
                    
            
                    <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth>
                        <DialogTitle>Add New Listing</DialogTitle>
                        <DialogContent>
                        <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} />
                        <TextField fullWidth label="Content" multiline rows={4} value={content} onChange={e => setContent(e.target.value)} />
                        <TextField fullWidth label="Location" value={location} onChange={e => setLocation(e.target.value)} />
                        <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <TextField fullWidth label="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                        <TextField fullWidth label="Price" value={price} onChange={e => setPrice(e.target.value)} />
                        <input type="file" onChange={e => setImage(e.target.files[0])} />
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                        <Button onClick={handleFormSubmit} color="primary" variant="contained">Add</Button>
                        </DialogActions>
                    </Dialog>
                    

                    <Box>
                      <Typography variant="title" text="Listings" />
                        {listings.map((listing) => (
                            <ListingCard 
                                key={listing._id} 
                                title={listing.title} 
                                image={listing.image} 
                                author={listing.author} 
                                createdAt={listing.createdAt} 
                                content={listing.content} 
                                location={listing.location} 
                                email={listing.email} 
                                phoneNumber={listing.phoneNumber} 
                                price={listing.price} 
                            />
                        ))}
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
        </>
    );
};

export default ListingFeed;
