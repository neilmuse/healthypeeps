import { Link } from '@mui/material';

const LinkComponent = ({
    variant,
    href,
    text, 
    children
}) => (
  <Link
    type="submit"
    fullWidth 
    variant={variant}
    href={href}
  >
    {text || children}
  </Link>
);

export default LinkComponent;
