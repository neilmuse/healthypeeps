import { CardMedia as MUICardMedia } from '@mui/material';

const CardMedia = ({
    height,
    image,
    text,
    fixed = false,
    ...props
}) => {
  const options = {
    image,
    alt: text,
    sx: {maxHeight: fixed ? "20em" : undefined},
    ...props
  };
  return <MUICardMedia
    component="img"
    image={image}
    alt={text}
  />
};

export default CardMedia;
