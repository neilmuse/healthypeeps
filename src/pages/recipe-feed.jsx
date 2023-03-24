import * as React from 'react';
import RecipeCard from '../views/recipe-card';
import recipes from '../data/recipes.json';
import GridContainer from '../components/grid-container.jsx';
import PageLayout from '../components/page-box-layout.jsx';
import Link from '../components/link.jsx';

const Recipe = (props) => {
  return (
    <>
      <PageLayout>
        <GridContainer 
          props = {recipes.map((recipe, index) => (
            <Link href={`/recipepage/${index}`}>
              <RecipeCard {...recipe} />
            </Link>
          ))}
        />
      </PageLayout>
    </>
  );
};

export default Recipe;

