import React from 'react';
import {
  Box as MUIBox,
  Grid,
  List,
  ListItem,
} from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';

import COLORS from '../constants/colors.js';

import CaloriesIcon from '@mui/icons-material/LocalDiningTwoTone';
import ProteinIcon from '@mui/icons-material/EggTwoTone';
import CarbohydratesIcon from '@mui/icons-material/BakeryDiningTwoTone';
import FatIcon from '@mui/icons-material/LocalPizzaTwoTone';

import recipes from '../data/recipes.json';

import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Avatar from '../components/avatar.jsx';

import Card from '../components/card.jsx';
import CommentCard from '../views/comment-card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';

const Recipe = () => {
  const { id } = useParams();
  const recipe = recipes[id] ?? {};

  const icons = [CaloriesIcon, ProteinIcon, CarbohydratesIcon, FatIcon];

  return (
    <>
      <Box sx={{border: 1}}>
        <Card>
          <Grid item>
            <Typography variant="hero_title" text={recipe.title ?? "N/A"} />

            <CardMedia image={recipe.image ?? ""} />

            <Divider/>

            <Typography variant="title" text="Brief Description" />
            <Typography variant="body1" text={recipe.description ?? "N/A"} />

            <Divider/>

            <Typography variant="title" text="Ingredients" />

            <List
              sx = {{
              listStyleType: 'disc',
              pl: 2,
              '& .MuiListItem-root': {
                display: 'list-item',
              },
              }} >
              {(recipe.ingredients ?? []).map(({ quantity, units, name }) => (
                <ListItem>
                  <Typography variant="body1" text={`${quantity ?? "N/A"} ${units ?? "N/A"} ${name ?? "N/A"}`} />
                </ListItem>
              ))}

            </List>

            <Divider/>

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
                (recipe.macros ?? []).map(({name, value}, index) =>
                  <Grid item xs={6} sm={3}>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Avatar/>
                      </Grid>
                      <Grid item>
                        <Typography variant="body_bold" text={value ?? "N/A"} />
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

            <Divider/>

            <Typography variant="title" text="Preparation" />
            {(recipe.preparation ?? []).map((prep, index) => (
              <List>
                <Typography variant="body_bold" text={"Step " + (index + 1)} />
                <Typography variant="body1" text={prep ?? "N/A"} />
              </List>
            ))}

            <Divider/>

            <CommentCard />
          </Grid>
        </Card>
      </Box>
      <Outlet />
    </>
  );
};

export default Recipe;

// import React from 'react';
// import {
//   Box,
//   Chip,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from '@mui/material';
// import recipes from '../data/recipes.json';

// const RecipeDisplay = () => {
//   const { id } = useParams();
//   const recipe = recipes[id] ?? {};
//   return (
//     <Box sx={{ mt: 3 }}>
//       <Typography variant="h6" text="Recipe Details" />

//       <Typography variant="subtitle1" text="Title" sx={{ mt: 2 }} />
//       <Typography>{recipe.title}</Typography>

//       <Typography variant="subtitle1" text="Image URL" sx={{ mt: 2 }} />
//       <Typography>{recipe.image}</Typography>

//       <Typography variant="subtitle1" text="Preparation Steps" sx={{ mt: 2 }} />
//       <List>
//         {recipe.preparation.map((step, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={`Step ${index + 1}`} secondary={step} />
//           </ListItem>
//         ))}
//       </List>

//       <Typography variant="subtitle1" text="Nutrition" sx={{ mt: 2 }} />
//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         {Object.entries(recipe.nutrition).map(([key, value]) => (
//           <Typography key={key}>
//             {key}: {value}
//           </Typography>
//         ))}
//       </Box>

//       <Typography variant="subtitle1" text="Ingredients" sx={{ mt: 2 }} />
//       <List>
//         {recipe.ingredients.map((ingredient, index) => (
//           <ListItem key={index}>
//             <ListItemText
//               primary={`${ingredient.value} ${ingredient.unit} ${ingredient.name}`}
//             />
//           </ListItem>
//         ))}
//       </List>

//       <Typography variant="subtitle1" text="Tags" sx={{ mt: 2 }} />
//       <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//         {recipe.tags.map((tag, index) => (
//           <Chip key={index} label={tag} />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default RecipeDisplay;
