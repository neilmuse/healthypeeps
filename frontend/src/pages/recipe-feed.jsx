import * as React from 'react';
import RecipeCard from '../views/recipe-card';
import recipes from '../data/recipes.json';
import ImageSlider from '../views/image-slider';
import PageLayout from '../components/page-box-layout.jsx';
import Link from '../components/link.jsx';

const Recipe = (props) => {
  const recipeCards = recipes.map((recipe, index) => (
    <Link href={`/recipepage/${index}`} key={index}>
      <RecipeCard {...recipe} />
    </Link>
  ));

  return (
    <>
      <PageLayout>
        <ImageSlider images={recipeCards} itemsPerSlide={3} />
      </PageLayout>
    </>
  );
};

export default Recipe;
