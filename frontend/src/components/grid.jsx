import { Grid as MUIGrid } from '@mui/material';

const Grid = ({ children }) => (
  <MUIGrid
    sx={{ my: 5, mx: 5, px: 5, py: 5 }}
  >
    {children}
  </MUIGrid>
);

export default Grid;
