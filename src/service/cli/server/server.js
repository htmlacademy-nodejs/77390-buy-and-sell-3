'use strict';

const express = require(`express`);

const routesOffers = require(`../../routes/offers`);
const routesApi = require(`../../routes/api`);
const {ctrlNotFound} = require(`../../controls/not-found`);
const {
  loggerUrlMiddleware,
  loggerStatusMiddleware,
} = require(`../../middlewares/logger`);

const app = express();
app.use(express.json());

app.use(loggerUrlMiddleware);
app.use(loggerStatusMiddleware);
app.use(`/offers`, routesOffers);
app.use(`/api`, routesApi);
app.use(ctrlNotFound);

module.exports = {
  app
};
