import { CardMedia } from "@mui/material";

const PictureCard = ({
    height,
    image,
    text
}) => (

  <CardMedia
    component="img"
    height={height}
    image={image}
    alt={text}
  />
);

export default PictureCard;
