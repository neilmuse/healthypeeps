import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App'
// import DrawerAppBar from 'src/components/appbar.jsx'
import SignupPage from "./pages/signup.jsx";
import LoginPage from "./pages/login.jsx";
import PageNotFound from "./pages/not-found.jsx"
import FeedLayout from "./pages/feed.jsx"
import RecipeLayout from "./pages/recipe.jsx"
import RecipePage from "./pages/recipepage.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route index element={<LoginPage />} />
        <Route path="/" element={<App />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} >
            {/* <Route path="feed" element={<FeedLayout />} />
                <Route path="recipe" element={<RecipeLayout />} />
                    <Route path=":id" element={<RecipePage />} /> */}
        </Route>
        <Route path="*"  element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);