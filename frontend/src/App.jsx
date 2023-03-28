import React from "react";
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";

import TopNavBar from "./components/appbar.jsx";

import RECIPE_THEME from "./themes/recipe-theme";

const App = () => {
    return (
        <>
          <ThemeProvider theme={RECIPE_THEME}>
            <TopNavBar/>
          </ThemeProvider>
        </>
    );
}

export default App;
