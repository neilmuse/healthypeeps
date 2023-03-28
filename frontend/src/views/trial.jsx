// ResponsiveImageSlider.js
import React, { useState } from 'react';
import { IconButton, Typography, Box, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const ResponsiveImageSlider = ({ items, itemsPerSlide }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerSlide);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalPages);
  };

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalPages) % totalPages);
  };

  const startIndex = currentSlide * itemsPerSlide;
  const endIndex = startIndex + itemsPerSlide;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <IconButton onClick={handlePreviousSlide}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={handleNextSlide}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {currentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia component="img" height="200" image={item.url} alt={item.caption} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.caption}
                </Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Typography variant="h6">Page {currentSlide + 1} of {totalPages}</Typography>
      </Grid>
    </Box>
  );
};

export default ResponsiveImageSlider;
