import { styled } from "@mui/material/styles";
import * as React from "react";
import { Avatar, Card, CardHeader, CardContent, CardActions, Collapse, IconButton } from '@mui/material';

import { red } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PictureCard from "../components/picture-card.jsx";
import SimpleText from "../components/simple-text.jsx";
import ButtonIcon from "../components/icon-button.jsx";

import ConvertTime from "../utils/moment.jsx";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipeCard = ({ title, image, author, createdAt }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>

      <img src={image} />

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {author?.name?.substr(0, 1)}
          </Avatar>
        }
        
        title={<SimpleText variant="cardtitle" text={title} />}
        subheader={<SimpleText variant="cardsubheader" text={ConvertTime(createdAt)} />}
      />

      <CardContent>
        <SimpleText variant="body1" text="Lorem Ipsum is simply dummy" />
      </CardContent>

      <CardActions disableSpacing>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <SimpleText variant="body1" text="Method:" />
          <SimpleText variant="body1" text="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes." />
          <SimpleText variant="body1" text="Set aside off of the heat to let rest for 10 minutes, and then serve." />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
