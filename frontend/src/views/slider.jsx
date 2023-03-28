import React from 'react';
import Carousel from 'react-material-ui-carousel';
import data from '../data/data.json';
import { Paper, Typography } from '@mui/material';

const ImageSlider = () => {
  return (
    <Carousel>
      {data.map((item, i) => (
        <Paper key={i} style={{ minHeight: '400px', position: 'relative' }}>
          <img src={item.url} alt={item.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Typography
            variant="h6"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {item.caption}
          </Typography>
        </Paper>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
