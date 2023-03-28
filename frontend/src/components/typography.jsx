import { Typography as MUITypography } from '@mui/material';

const Typography = ({
    variant,
    text,
}) => (

  <MUITypography
    variant={variant}
    style={{ textAlign: 'justify' }}
  >
    {text}
  </MUITypography>
);

export default Typography;
