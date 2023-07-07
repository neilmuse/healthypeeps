import { Link as MUILink } from '@mui/material';

const Link = ({
    variant,
    href,
    text,
    children,
    onClick
}) => (
  <MUILink
    type="submit"
    fullWidth 
    variant={variant}
    href={href}
    onClick={onClick}
  >
    {text || children}
  </MUILink>
);

export default Link;
