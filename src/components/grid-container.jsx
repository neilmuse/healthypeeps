import { Grid } from "@mui/material";

const GridContainer = ({
    props
}) => (
  
    <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="baseline"
        style={{ margin: '20px' }}
    >
        {...props}
    </Grid>
);

export default GridContainer;
