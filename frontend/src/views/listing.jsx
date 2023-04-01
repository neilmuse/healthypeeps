import React from 'react';
import {
  Box as MUIBox,
  Grid,
  List,
  ListItem,
} from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import PhoneIcon from '@mui/icons-material/LocalPhoneOutlined';

import listings from '../data/listing.json';

import Typography from '../components/typography.jsx';
import CardMedia from '../components/cardmedia.jsx';
import Avatar from '../components/avatar.jsx';

import Card from '../components/card.jsx';
import CommentCard from '../views/comment-card.jsx';
import Box from '../components/box.jsx';
import Divider from '../components/divider.jsx';

const Listing = () => {
  const { id } = useParams();
  const listing = listings[id] ?? {};

  return (
    <>
      <Box sx={{border: 1}}>
        <Card>
          <Grid item>
            <Typography variant="hero_title" text={listing.title ?? "N/A"} />

            <CardMedia image={listing.imageUrl ?? ""} />

            <Divider/>

            <Typography variant="title" text="Brief Description" />
            <Typography variant="body1" text={listing.description ?? "N/A"} />

            <Divider/>

            <Typography variant="title" text="Price" />
            <Typography variant="body1" text={`${listing.price} ${listing.currency} ` ?? "N/A"} />

            <Divider/>

            <Typography variant="title" text="Contact Me" />

            <Grid container spacing={2} p={3}>
                {
                (listing.email ?? []).map((email, index) =>
                  <Grid item xs={6} sm={3}>
                    <Grid container direction="row">
                      <Grid item>
                        <EmailIcon/>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" text={email ?? "N/A"} />
                      </Grid>
                    </Grid>
                  </Grid>
                )
                }
            </Grid>

            <Grid container spacing={2} p={3}>
                {
                (listing.phone_number ?? []).map((number, index) =>
                  <Grid item xs={6} sm={3}>
                    <Grid container direction="row">
                      <Grid item>
                        <PhoneIcon/>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" text={number ?? "N/A"} />
                      </Grid>
                    </Grid>
                  </Grid>
                )
                }
            </Grid>

            <Divider/>

            <CommentCard />
          </Grid>
        </Card>
      </Box>
      <Outlet />
    </>
  );
};

export default Listing;