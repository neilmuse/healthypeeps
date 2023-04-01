import * as React from 'react';
import RecipeCard from '../views/recipe-card';
import recipes from '../data/recipes.json';
import ImageSlider from '../views/image-slider';
import Box from '../components/box.jsx';
import Link from '../components/link.jsx';

const Recipe = (props) => {
  const recipeCards = recipes.map((recipe, index) => (
    <Link href={`/recipe/${index}`} key={index}>
      <RecipeCard {...recipe} />
    </Link>
  ));

  return (
    <>
      <ImageSlider images={recipeCards} itemsPerSlide={3} />
    </>
  );
};

export default Recipe;
