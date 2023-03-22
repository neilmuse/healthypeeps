import { Typography } from "@mui/material";

const SimpleText = ({
    variant,
    text,
}) => (

  <Typography
    variant={variant}
    style={{ textAlign: 'justify' }}
  >
    {text}
  </Typography>
);

export default SimpleText;
