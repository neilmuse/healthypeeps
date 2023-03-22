import { Link } from "@mui/material";

const LinkComponent = ({
    variant,
    href,
    text
}) => (

  <Link
    type="submit"
    fullWidth 
    variant={variant}
    href={href}
  >
    {text}
  </Link>
);

export default LinkComponent;
