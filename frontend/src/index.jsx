import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from '@mui/material/styles';

import RECIPE_THEME from './themes/recipe-theme';

import App from './App';
import TopNavBar from './components/appbar.jsx';
import SignupPage from './pages/signup.jsx';
import LoginPage from './pages/login.jsx';
import ResetPasswordPage from './pages/reset-password.jsx';
import PageNotFound from './pages/not-found.jsx';
import RecipeLayout from './pages/recipe-feed.jsx';
import RecipePage from './pages/recipe.jsx';
import ListingLayout from './pages/listing.jsx';
import ListingPage from './views/listing.jsx';
import Homepage from './pages/homepage.jsx';
import AboutUs from './pages/about-us.jsx';
import ProfilePage from './pages/profile.jsx';
import AdminPage from './pages/admin-pages/accept-delete-posts.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyledEngineProvider>
      <ThemeProvider theme={RECIPE_THEME}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopNavBar />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
              <Route path="recipes" element={<RecipeLayout />} />
              <Route path="recipe/:id" element={<RecipePage />} />
              <Route path="listing" element={<ListingLayout />} />
              <Route path="listing/:id" element={<ListingPage />} />
              <Route path="home" element={<Homepage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="profile/:id" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);

