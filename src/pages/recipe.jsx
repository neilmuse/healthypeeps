import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  useMediaQuery,
} from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

import recipePic from "../assets/recipe-pic.jpg";
import nutriFacts from "../assets/nutrifacts.png";

import CaloriesIcon from '@mui/icons-material/LocalDiningTwoTone';
import ProteinIcon from '@mui/icons-material/EggTwoTone';
import CarbohydratesIcon from '@mui/icons-material/BakeryDiningTwoTone';
import FatIcon from '@mui/icons-material/LocalPizzaTwoTone';

import "./recipe.css";

import recipes from '../data/recipes.json';
import comments from '../data/comments.json';

import SimpleText from '../components/simple-text.jsx';
import GridContainer from '../components/grid-container.jsx';
import AvatarIcon from '../components/avatar-icon.jsx';

import CardComponent from '../components/card-component.jsx';
import CommentCard from '../views/comment-card.jsx';

const Recipe = () => {
  const { id } = useParams();
  const recipe = recipes[id];

  return (
    <>
      <CardComponent props={
        <Grid item xs={12} md={6} lg={4}>
          <SimpleText variant="title" text={recipe.title} />

          <img src={recipe.image} />

          <SimpleText variant="title" text="Brief Description" />
          <SimpleText variant="body1" text={recipe.description} />

          <SimpleText variant="title" text="Ingredients" />

          <GridContainer 
            props = {recipe?.macros?.map(({ name, value }, index) => (
              <Grid item>
                <ListItemButton key={index}>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <AvatarIcon props={<CaloriesIcon/>} />
                          <SimpleText variant="body1" text={name} />
                          <SimpleText variant="body1" text={value} />
                        </ListItemAvatar>
                      </ListItem>
                    </List>
                </ListItemButton>
              </Grid>
            ))}
          />

          <SimpleText variant="title" text="Macronutrients" />

          <GridContainer 
            props = {recipe?.macros?.map(({ name, value }, index) => (
              <Grid item>
                <ListItemButton key={index}>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <AvatarIcon props={<CaloriesIcon/>} />
                          <SimpleText variant="body1" text={name} />
                          <SimpleText variant="body1" text={value} />
                        </ListItemAvatar>
                      </ListItem>
                    </List>
                </ListItemButton>
              </Grid>
            ))}
          />

          <SimpleText variant="title" text="Preparation" />

          <SimpleText variant="body1" text={recipe?.preparation} />

          <SimpleText variant="title" text="Nutrition Facts" />

          <img src={nutriFacts} />

          <CommentCard />
        </Grid>
      } />
      <Outlet />
    </>
  );
};

export default Recipe;