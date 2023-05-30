import React, { useState, useEffect } from 'react';
import RecipeCard from '../views/recipe-card';
import ImageSlider from '../views/image-slider';
import Box from '../components/box.jsx';
import Grid from '../components/grid.jsx';
// import { getPosts } from "../api/index.js";

const Recipe = (props) => {
  const [recipes, setRecipes] = useState();

  // useEffect(() => {
  //   getPosts().then(data =>
  //     setRecipes(data));
  // }, [])


  return (
    <Grid>
      {recipes?.map((recipe, index) => (
        <RecipeCard {...recipe} />
      ))}
    </Grid>
  );
};

export default Recipe;

