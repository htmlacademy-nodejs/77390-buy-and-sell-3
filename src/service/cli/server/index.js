'use strict';

const {log} = require(`../../../utils/log`);
const colors = require(`colors/safe`);
require(`../../../utils/env`);
const {app} = require(`./server`);

const DEFAULT_PORT = process.env.DEFAULT_PORT;

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
