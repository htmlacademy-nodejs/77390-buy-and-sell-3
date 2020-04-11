'use strict';

require(`../utils/env`);
const colors = require(`colors/safe`);
const express = require(`express`);
const offersRoutes = require(`./routes/offers`);
const myRoutes = require(`./routes/my`);
const mainRoutes = require(`./routes/main`);

const PORT = process.env.DEFAULT_PORT_FRONT_SERVER;

const app = express();

app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.listen(PORT, () => {
  console.log(colors.green(`Ожидаю соединений на ${PORT}`))
});
