import React, { useState } from 'react';
import { Box, IconButton, Grid } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ImageSlider = ({ images, itemsPerSlide }) => {
  const [current, setCurrent] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsToShow = isSmallScreen ? 1 : itemsPerSlide;

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - itemsToShow : prev - itemsToShow));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + itemsToShow) % images.length);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handlePrev}>
        <ChevronLeft />
      </IconButton>
      <Grid container spacing={2}>
        {images.slice(current, current + itemsToShow).map((image, index) => (
          <Grid key={index} item xs={12} sm={6} md={12 / itemsPerSlide}>
            {image}
          </Grid>
        ))}
      </Grid>
      <IconButton onClick={handleNext}>
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default ImageSlider;
