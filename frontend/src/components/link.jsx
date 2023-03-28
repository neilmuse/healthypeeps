import { Link as MUILink } from '@mui/material';

const Link = ({
    variant,
    href,
    text, 
    children
}) => (
  <MUILink
    type="submit"
    fullWidth 
    variant={variant}
    href={href}
  >
    {text || children}
  </MUILink>
);

export default Link;
