'use strict';

const express = require(`express`);
require(`../../utils/env`);

const routesOffers = require(`../routes/offers`);
const routesApi = require(`../routes/api`);
const {ctrlNotFound} = require(`../controls/not-found`);

const {log} = require(`../../utils/log`);
const colors = require(`colors/safe`);

const DEFAULT_PORT = process.env.DEFAULT_PORT;

const app = express();
app.use(express.json());

app.use(`/offers`, routesOffers);
app.use(`/api`, routesApi);
app.use(ctrlNotFound);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return log(`Ошибка при создании сервера: ${err}`, {status: `error`});
      }

      return console.info(colors.green(`Ожидаю соединений на ${port}`));
    });
  }
};
