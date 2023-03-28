import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, Collapse } from '@mui/material';

import { red } from '@mui/material/colors';
import COLORS from '../constants/colors.js';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Typography from '../components/typography.jsx';
import IconButton from '../components/iconbutton.jsx';

import ConvertTime from '../utils/moment.jsx';

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

const RecipeCard = ({ title, author, createdAt }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>

      {/* <img src={image} /> */}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: COLORS.GREEN}} >
            {author?.name?.substr(0, 1)}
          </Avatar>
        }
        
        
        title={<Typography variant="cardtitle" text={title} />}
        subheader={<Typography variant="cardsubheader" text={ConvertTime(createdAt)} />}
      />

      <CardContent>
        <Typography variant="body1" text="Lorem Ipsum is simply dummy" />
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
          <Typography variant="body1" text="Method:" />
          <Typography variant="body1" text="Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes." />
          <Typography variant="body1" text="Set aside off of the heat to let rest for 10 minutes, and then serve." />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
