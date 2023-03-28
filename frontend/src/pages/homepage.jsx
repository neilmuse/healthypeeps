import React from 'react';
import { Button, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SearchField from '../components/search-field.jsx';
import FilterCategory from '../components/filter-category.jsx';
import RecipeFeed from './recipe-feed.jsx';
import SimpleText from '../components/simple-text.jsx';
import PageLayout from '../components/page-box-layout.jsx';
import HomepageHero from '../components/hero-section.jsx';
import { Link } from "react-router-dom";

import Arrow from '@mui/icons-material/ArrowForwardIosTwoTone';

const Homepage = () => {
  const itemsPerSlide = 3;
  return (
    <>
      <PageLayout>

        <HomepageHero />

        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <SimpleText variant="hero_title" text="What's your plan today?" />
            <SearchField />
            <FilterCategory />
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <SimpleText variant="title" text="New Recipes" />
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
            <Button component={Link} to="/recipe" color="primary" variant="text">
              View All
            </Button>
          </Grid>
        </Grid>
        <RecipeFeed />

        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <SimpleText variant="title" text="Discussions" />
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
            <Button component={Link} to="/discussions" color="primary" variant="text">
              View All
            </Button>
          </Grid>
        </Grid>
        <RecipeFeed />

        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <SimpleText variant="title" text="Reviews" />
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
            <Button component={Link} to="/reviews" color="primary" variant="text">
              View All
            </Button>
          </Grid>
        </Grid>
        <RecipeFeed />
  
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <SimpleText variant="title" text="Listings" />
          </Grid>
          <Grid item xs={12} sm={6} textAlign={{ xs: 'left', sm: 'right' }}>
            <Button component={Link} to="/listings" color="primary" variant="text">
              View All
            </Button>
          </Grid>
        </Grid>
        <RecipeFeed />

      </PageLayout>
      <Outlet />
    </>
  );
};

export default Homepage;
