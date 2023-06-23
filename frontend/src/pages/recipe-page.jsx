import React, { useContext, useEffect, useState } from 'react';
import {
  Box as MUIBox,
  Grid,
  Link,
  List,
  ListItem,
} from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';

import COLORS from '../constants/colors.js';

import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Avatar from '../components/avatar.jsx';
import Card from '../components/card.jsx';
import CommentCard from '../views/comment-card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';

import { AuthContext } from '../context/auth-context';

const RecipePage = () => {
    const { user } = useContext(AuthContext);
    const post = JSON.parse(localStorage.getItem('data'));

    return (
        <>
        <Box sx={{ border: 1 }}>
            <Card>
                <Grid item>
                    <Typography variant="hero_title" text={post.title ?? "N/A"} />

                    <CardMedia image={post.image ?? ""} />

                    <Divider />

                    <Typography variant="title" text="Brief Description" />
                    <Typography variant="body1" text={post.content ?? "N/A"} />

                    <Divider />

                    <Typography variant="title" text="Preparation Time (in minutes)" />
                    <Typography variant="body1" text={post.preparationTime ?? "N/A"} />

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
                    {(post.ingredients ?? []).map(({ name, unit, amount }) => (
                        <ListItem>
                        <Typography variant="body1" key={amount} text={`${name ?? "N/A"} ${unit ?? "N/A"} ${amount ?? "N/A"}`} />
                        </ListItem>
                    ))}

                    </List>

                    <Divider />

                    <Typography variant="title" text="Macronutrients" />

                    <MUIBox
                    sx={{
                        backgroundColor: COLORS.LIGHT_GREEN,
                    }}
                    >

                        <Grid container spacing={2} p={3}>
                            {Object.entries(post.macros ?? {}).map(([key, value], index) =>
                                <Grid item key={index} xs={6} sm={3}>
                                    <Grid container direction="column" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body_bold" text={value ?? "N/A"} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" text={key ?? "N/A"} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </MUIBox>

                    <Divider />

                    <Typography variant="title" text="Preparation" />

                    <Grid container direction="column">
                        {(post.preparation ?? []).map((step, index) =>
                            <Grid item key={index}>
                                <Typography variant="body1" text={`Step ${index + 1}: ${step}`} />
                            </Grid>
                        )}
                    </Grid>


                    <Divider />

                    <CommentCard postId={post?._id} authorId={user?._id} />
                </Grid>
            </Card>
        </Box>
        <Outlet />
        </>
    );
};

export default RecipePage;