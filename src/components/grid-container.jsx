import { Grid } from '@mui/material';

const GridContainer = ({
    props
}) => (
    <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="baseline"
    >
        {...props}
    </Grid>
);

export default GridContainer;
