import React from "react";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  useMediaQuery,
} from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

import COLORS from '../constants/colors.js';

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
import PictureCard from '../components/picture-card.jsx';
import AvatarIcon from '../components/avatar-icon.jsx';

import CardComponent from '../components/card-component.jsx';
import CommentCard from '../views/comment-card.jsx';
import PageLayout from '../components/page-box-layout.jsx';
import ContentDivider from '../components/divider-content.jsx';

const Recipe = () => {
  const { id } = useParams();
  const recipe = recipes[id];

  const icons = [CaloriesIcon, ProteinIcon, CarbohydratesIcon, FatIcon];

  return (
    <>
      <PageLayout sx={{border: 1}}>
        <CardComponent>
          <Grid item>
            <SimpleText variant="hero_title" text={recipe.title} />

            <PictureCard image={recipe.image} />

            <ContentDivider/>

            <SimpleText variant="title" text="Brief Description" />
            <SimpleText variant="body1" text={recipe.description} />

            <ContentDivider/>

            <SimpleText variant="title" text="Ingredients" />

            <List
              sx = {{
              listStyleType: 'disc',
              pl: 2,
              '& .MuiListItem-root': {
                display: 'list-item',
              },
              }} >
              {recipe?.ingredients?.map(({ quantity, units, name }, index) => (
                <ListItem>
                  <SimpleText variant="body1" text={quantity + " " + units + " " +  name} />
                </ListItem>
              ))}

            </List>

            <ContentDivider/>

            <Box>
              <Box display="inline-block">
              <SimpleText variant="title" text="Nutrition Facts" />
              </Box>
              <Box display="inline-block" mx={1}>
                <SimpleText variant="small" text="(per serving)" />
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: COLORS.LIGHT_GREEN,
              }}
            >

            <Grid container spacing={2} p={3}>
              {
              recipe?.macros?.map(({name, value}, index) =>
                <Grid item xs={6} sm={3}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      <AvatarIcon/>
                    </Grid>
                    <Grid item>
                      <SimpleText variant="body_bold" text={value} />
                    </Grid>
                    <Grid item>
                      <SimpleText variant="body1" text={name} />
                    </Grid>
                  </Grid>
                </Grid>
              )
              }
            </Grid>
            </Box>

            <ContentDivider/>

            <SimpleText variant="title" text="Preparation" />
            {recipe?.preparation.map((prep, index) => (
              <List>
                <SimpleText variant="body_bold" text={"Step " + (index + 1)} />
                <SimpleText variant="body1" text={prep} />
              </List>
            ))}

            <ContentDivider/>

            <CommentCard />
          </Grid>
        </CardComponent>
      </PageLayout>
      <Outlet />
    </>
  );
};

export default Recipe;
