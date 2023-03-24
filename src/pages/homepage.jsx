import React from "react";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import SearchField from "../components/search-field.jsx";
import FilterCategory from "../components/filter-category.jsx";
import RecipeLayout from "./recipe-feed.jsx";
import GridContainer from '../components/grid-container.jsx';
import SimpleText from '../components/simple-text.jsx';
import PageLayout from '../components/page-box-layout.jsx';

import Arrow from '@mui/icons-material/ArrowForwardIosTwoTone';

const Homepage = () => {
  return (
    <>
      <PageLayout>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <SearchField />
            <FilterCategory />
          </Grid>
          <SimpleText variant="hero_title" text="What's New" />
          <Arrow/>
          <RecipeLayout/>
        </Grid>
      </PageLayout>
      <Outlet />
    </>
  );
};

export default Homepage;

