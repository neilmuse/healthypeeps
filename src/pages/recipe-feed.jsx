import * as React from 'react';
import RecipeCard from '../views/recipe-card';
import recipes from '../data/recipes.json';
import GridContainer from '../components/grid-container.jsx';

const Recipe = (props) => {
  return (
    <>
      <GridContainer 
        props = {recipes.map((recipe) => (
          <RecipeCard {...recipe} />
        ))}
      />
    </>
  );
};

export default Recipe;

