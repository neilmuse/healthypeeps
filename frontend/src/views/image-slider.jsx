import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Grid, Link } from '@mui/material';
import Typography from '../components/typography.jsx';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import COLORS from '../constants/colors.js';
import { useNavigate } from 'react-router-dom';
import ConvertTime from '../utils/moment.jsx';
import { imageStyle, imageContainerStyle } from '../constants/styles';

import { authGetUserById } from '../auth';

const ImageSlider = ({ images, itemsPerSlide }) => {
  const NAVIGATE = useNavigate();
  const [current, setCurrent] = useState(0);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsToShow = isSmallScreen ? 2 : itemsPerSlide; 

  const handleCardClick = async (category, id) => {
    try {
      NAVIGATE(`/${category}/${id}`);
    } catch (error) {
        console.error('Error fetching post:', error);
    }
  }

  // Function to truncate the text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  if (!images || images.length === 0) {
    return (
      <Box>
        <Typography variant="body1">Loading images...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={2}>
        {images.slice(current, current + itemsToShow).map((image, index) => (
          <Grid 
            key={index} 
            item 
            xs={12/itemsToShow}
            sm={6/itemsToShow} 
            md={12/itemsToShow}
            onClick={() => handleCardClick(image.category, image._id)}
            style={{cursor: 'pointer'}}
          >
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', width: '200px' }}>
                <img src={image.image || 'https://img.freepik.com/premium-vector/healthy-food-concept-fresh-vegetables-bowl_24877-66987.jpg'} alt="Image Description Temp" style={{ maxHeight: '100%', maxWidth: '100%' }} />
              </div>

              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: COLORS.GREEN}} >
                    {(image.author.firstName[0] + image.author.lastName[0]).toUpperCase()}
                  </Avatar>
                }
                title={<Typography variant="cardtitle" text={truncateText(image.title, 12)} />}
                subheader={<Typography variant="cardsubheader" text={image.author.firstName + " " + image.author.lastName + " " + "· " + ConvertTime(image.createdAt)} />}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" text={truncateText(image.content, 18)} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageSlider;
