import { CardMedia } from "@mui/material";

const PictureCard = ({
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
  return <CardMedia
    component="img"
    image={image}
    alt={text}
  />
};

export default PictureCard;
