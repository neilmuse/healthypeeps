import { Grid as MUIGrid } from '@mui/material';

const Grid = ({
    props
}) => (
    <MUIGrid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="baseline"
    >
        {...props}
    </MUIGrid>
);

export default Grid;
