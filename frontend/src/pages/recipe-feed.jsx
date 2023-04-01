import * as React from 'react';
import RecipeCard from '../views/recipe-card';
import recipes from '../data/recipes.json';
import ImageSlider from '../views/image-slider';
import Box from '../components/box.jsx';
import Grid from '../components/grid.jsx';

const Recipe = (props) => {
  return (
    <>
      <Grid 
        props = {recipes.map((recipe, index) => (
          <RecipeCard {...recipe} />
        ))}
      />
    </>
  );
};

export default Recipe;
