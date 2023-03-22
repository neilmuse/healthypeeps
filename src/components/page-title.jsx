import React from "react";
import SimpleText from '../components/simple-text.jsx';
import Arrow from '@mui/icons-material/ArrowForwardIosTwoTone';

<SimpleText variant="homepagetitle" text="What's New" />
<Arrow/>

const Homepage = () => {
  return (
    <>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <SearchField />
          <FilterCategory />
          <SimpleText variant="homepagetitle" text="What's New" />
          <Arrow/>
        </Grid>
      </Grid>
      <Outlet />
    </>
  );
};

export default Homepage;