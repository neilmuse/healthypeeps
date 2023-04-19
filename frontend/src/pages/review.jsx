import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';

const reviews = [
  {
    id: 1,
    title: 'Review Title 1',
    content: 'This is an example review content. It is a great product!',
    imageUrl: 'https://via.placeholder.com/150',
    tags: ['tag1', 'tag2'],
    author: 'John Doe',
    dateCreated: '2023-03-22',
  },
  {
    id: 2,
    title: 'Review Title 2',
    content: 'This is another example review content. Highly recommended!',
    imageUrl: 'https://via.placeholder.com/150',
    tags: ['tag3', 'tag4'],
    author: 'Jane Smith',
    dateCreated: '2023-03-21',
  },
];

const ReviewCard = ({ review }) => {
  const { title, content, imageUrl, tags, author, dateCreated } = review;

  return (
    <Card sx={{ maxWidth: 345, mb: 4 }}>
      <CardHeader
        title={title}
        subheader={`By ${author} on ${dateCreated}`}
      />
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt="Review image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const ReviewList = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </Box>
  );
};

export default ReviewList;
