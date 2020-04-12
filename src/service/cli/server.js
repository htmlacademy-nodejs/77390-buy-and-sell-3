'use strict';

const http = require(`http`);
require(`../../utils/env`);

const {ctrlHome} = require(`../../controls/home`);
const {ctrlNotFound} = require(`../../controls/not-found`);

const {log} = require(`../../utils/log`);
const colors = require(`colors/safe`);

const DEFAULT_PORT = process.env.DEFAULT_PORT;

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      await ctrlHome(req, res);
      break;
    default:
      await ctrlNotFound(req, res);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http
      .createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return log(`Ошибка при создании сервера: ${err}`, {status: 'error'});
        }

        return console.info(colors.green(`Ожидаю соединений на ${port}`));
      });
  }
};
