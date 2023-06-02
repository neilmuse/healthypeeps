import React, { useState, useContext } from 'react';
import RecipeCard from '../views/recipe-card';
import ImageSlider from '../views/image-slider';
import Box from '../components/box.jsx';
import Grid from '../components/grid.jsx';
import Typography from '../components/typography.jsx';
import { AuthContext } from '../context/auth-context';

const Recipe = (props) => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState();

  return (
    <>
      <Grid>
        {recipes?.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </Grid>
    </>
  );
};

export default Recipe;

