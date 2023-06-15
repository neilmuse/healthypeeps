import React, { useContext, useEffect, useState } from 'react';
import {
  Box as MUIBox,
  Grid,
  Link,
  List,
  ListItem,
} from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import { getPost } from '../api/index.js';

import COLORS from '../constants/colors.js';

import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Avatar from '../components/avatar.jsx';
import Card from '../components/card.jsx';
import CommentCard from '../views/comment-card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';

import { AuthContext } from '../context/auth-context';

const ReviewPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
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
                <Typography variant="body1" text={post.description ?? "N/A"} />

                <Divider />

                <MUIBox
                sx={{
                    backgroundColor: COLORS.LIGHT_GREEN,
                }}
                >

                <Grid container spacing={2} p={3}>
                </Grid>
                </MUIBox>

                <Divider />

                <CommentCard postId={post._id} authorId={user._id} />
            </Grid>
            </Card>
        </Box>
        <Outlet />
        </>
    );
};

export default ReviewPage;
