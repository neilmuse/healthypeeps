import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import TopNavBar from "./components/appbar.jsx";
import AddDiscussion from "./components/add-discussion.jsx";
import SignupPage from "./pages/signup.jsx";
import LoginPage from "./pages/login.jsx";
import PageNotFound from "./pages/not-found.jsx";
import RecipeLayout from "./pages/recipe-feed.jsx";
import RecipePage from "./pages/recipe.jsx";
import Homepage from "./pages/homepage.jsx";
import AboutUs from "./pages/about-us.jsx";
import AdminPage from "./pages/admin-pages/accept-delete-posts.jsx";

import { ThemeProvider } from "@mui/material/styles";

// import RECIPE_THEME from "./themes/recipe-theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={RECIPE_THEME}> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="recipe" element={<RecipeLayout />} />
            <Route path="recipepage/:id" element={<RecipePage />} />
            <Route path="home" element={<Homepage />} />
            <Route path="add-discussion" element={<AddDiscussion />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="about" element={<AboutUs />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);

