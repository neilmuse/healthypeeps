const express = require('express');

const registerRoutes = (app, routes = [], prefixString = '') => {
  const router = express.Router(); // Move this line here

  routes.forEach((route, index) => {
    console.log(`Registering route ${index}:`, route);
    route.configure(router);
  });

  app.use(prefixString, router);
};

module.exports = registerRoutes;
