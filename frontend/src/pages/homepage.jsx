import React, { useEffect, useState, useContext } from 'react';
import { Box as MuiBox, Button, Chip, Container, Grid, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, InputLabel, FormControl, IconButton, Select, TextField, } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';

import SearchField from '../components/search-field.jsx';
import RecipeFeed from './recipe-slider.jsx';
import Typography from '../components/typography.jsx';
import Box from '../components/box.jsx';
import HomepageHero from '../components/hero-section.jsx';
import Divider from '../components/divider.jsx';

import ImageSlider from '../views/image-slider';

import { AuthContext } from '../context/auth-context';
import { authGetAllPostsByCategoryLimited, authGetUserById } from "../auth";

const Homepage = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [listings, setListings] = useState([]);
  const categories = ['recipes', 'discussions', 'reviews', 'listings'];

  const [state, setState] = useState({
    discussions: [],
    reviews: [],
    listings: [],
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        for (let category of categories) {
          let posts = await authGetAllPostsByCategoryLimited(category);
          let postsWithAuthor = await Promise.all(posts.map(async post => {
            let author = await authGetUserById(post.author);
            return { ...post, author: { firstName: author.firstName, lastName: author.lastName }};
          }));
          setState((prevState) => ({ ...prevState, [category]: postsWithAuthor }));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);  

  return (
    <>
      <Box>
        <HomepageHero />

        <Container>

          <Divider />

          <Typography variant="title" text= {user ? `Hello, ${user.firstName + "!"}` : 'Hello, Guest!'} />

          <Grid container justifyContent="center" alignItems="center">
            <Grid>
              <Typography variant="hero_title" text="What can we help you with?" />
            </Grid>
          </Grid>

          <Divider />

          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="title" text="New Recipes" />
            </Grid>
            <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
              <Button component={Link} to="/recipes" color="primary" variant="text">
                View All
              </Button>
            </Grid>
          </Grid>

          <ImageSlider images={state.recipes} itemsPerSlide={5} />

          <Divider />

          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="title" text="Discussions" />
            </Grid>
            <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
              <Button component={Link} to="/discussions" color="primary" variant="text">
                View All
              </Button>
            </Grid>
          </Grid>

          <ImageSlider images={state.discussions} itemsPerSlide={5} />

          <Divider />

          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="title" text="Reviews" />
            </Grid>
            <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
              <Button component={Link} to="/reviews" color="primary" variant="text">
                View All
              </Button>
            </Grid>
          </Grid>

          <ImageSlider images={state.reviews} itemsPerSlide={5} />

          <Divider />

          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="title" text="Listings" />
            </Grid>
            <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
              <Button component={Link} to="/listings" color="primary" variant="text">
                View All
              </Button>
            </Grid>
          </Grid>

          <ImageSlider images={state.listings} itemsPerSlide={5} />

          <Divider />

        </Container>
      </Box>
      <Outlet />
    </>
  );
};

export default Homepage;
