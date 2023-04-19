import React, { useState, useEffect } from 'react';
import RecipeCard from '../views/recipe-card';
import ImageSlider from '../views/image-slider';
import Box from '../components/box.jsx';
import Link from '../components/link.jsx';
import { getPosts } from "../api/index.js";

const Recipe = (props) => {
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    getPosts().then(data => 
      console.log(data),
      setRecipes(data));
  }, [])

  const recipeCards = recipes.map((recipe, index) => (
    <Link href={`/recipe/${index}`} key={index}>
      <RecipeCard {...recipe} />
    </Link>
  ));

  return (
    <>
      <ImageSlider images={recipeCards} itemsPerSlide={5} />
    </>
  );
};

export default Recipe;
