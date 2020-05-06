'use strict';

const express = require(`express`);

const routesOffers = require(`../../routes/offers`);
const routesApi = require(`../../routes/api`);
const {ctrlNotFound} = require(`../../controls/not-found`);

const app = express();
app.use(express.json());

app.use(`/offers`, routesOffers);
app.use(`/api`, routesApi);
app.use(ctrlNotFound);

module.exports = {
  app
};
