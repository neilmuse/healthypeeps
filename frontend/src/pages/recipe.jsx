import React, { useEffect, useState } from 'react';
import {
  Box as MUIBox,
  Grid,
  List,
  ListItem,
} from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import { getPost } from '../api/index.js';

import COLORS from '../constants/colors.js';

import CaloriesIcon from '@mui/icons-material/LocalDiningTwoTone';
import ProteinIcon from '@mui/icons-material/EggTwoTone';
import CarbohydratesIcon from '@mui/icons-material/BakeryDiningTwoTone';
import FatIcon from '@mui/icons-material/LocalPizzaTwoTone';

import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Avatar from '../components/avatar.jsx';
import Card from '../components/card.jsx';
import CommentCard from '../views/comment-card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const icons = [CaloriesIcon, ProteinIcon, CarbohydratesIcon, FatIcon];

  useEffect(() => {
    getPost(id).then(data =>
      setRecipe(data));
  }, [])

  return (recipe &&
    <>
      <Box sx={{ border: 1 }}>
        <Card>
          <Grid item>
            <Typography variant="hero_title" text={recipe.title ?? "N/A"} />

            <CardMedia image={recipe.image ?? ""} />

            <Divider />

            <Typography variant="title" text="Brief Description" />
            <Typography variant="body1" text={recipe.description ?? "N/A"} />

            <Divider />

            <Typography variant="title" text="Ingredients" />

            <List
              sx={{
                listStyleType: 'disc',
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                },
              }} >
              {(recipe.ingredients ?? []).map(({ amount, units, name }) => (
                <ListItem>
                  <Typography variant="body1" key={name} text={`${amount ?? "N/A"} ${units ?? "N/A"} ${name ?? "N/A"}`} />
                </ListItem>
              ))}

            </List>

            <Divider />

            <MUIBox>
              <MUIBox display="inline-block">
                <Typography variant="title" text="Nutrition Facts" />
              </MUIBox>
              <MUIBox display="inline-block" mx={1}>
                <Typography variant="small" text="(per serving)" />
              </MUIBox>
            </MUIBox>

            <MUIBox
              sx={{
                backgroundColor: COLORS.LIGHT_GREEN,
              }}
            >

              <Grid container spacing={2} p={3}>
                {
                  (recipe.macros ?? []).map(({ name, amount }, index) =>
                    <Grid item xs={6} sm={3}>
                      <Grid container direction="column" alignItems="center">
                        <Grid item>
                          <Avatar />
                        </Grid>
                        <Grid item>
                          <Typography variant="body_bold" text={amount ?? "N/A"} />
                        </Grid>
                        <Grid item>
                          <Typography variant="body1" text={name ?? "N/A"} />
                        </Grid>
                      </Grid>
                    </Grid>
                  )
                }
              </Grid>
            </MUIBox>

            <Divider />

            <Typography variant="title" text="Preparation" />
            {(recipe.preparation ?? []).map(({ instruction }, index) => (
              <List>
                <Typography variant="body_bold" text={"Step " + (index + 1)} />
                <Typography variant="body1" text={instruction ?? "N/A"} />
              </List>
            ))}

            <Divider />

            <CommentCard />
          </Grid>
        </Card>
      </Box>
      <Outlet />
    </>
  );
};

export default Recipe;
