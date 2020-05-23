'use strict';

require(`../../../utils/env`)
const express = require(`express`);

const routesOffers = require(`../../routes/offers`);
const routesApi = require(`../../routes/api`);
const {ctrlNotFound} = require(`../../controls/not-found`);
const {
  loggerUrlMiddleware,
  loggerStatusMiddleware,
} = require(`../../middlewares/logger`);
const {API_PREFIX} = require(`../../../constants/urls`);
const {PATH_TO_UPLOADS_DIR} = require(`../../../constants/paths`);

const app = express();
app.use(express.json());

app.use(process.env.UPLOADS_DIR, express.static(PATH_TO_UPLOADS_DIR));
app.use(loggerUrlMiddleware);
app.use(loggerStatusMiddleware);
app.use(`/offers`, routesOffers);
app.use(API_PREFIX, routesApi);
app.use(ctrlNotFound);

module.exports = {
  app
};
