'use strict';

require(`../../../utils/env`);
const {app} = require(`./server`);
const logger = require(`../../../utils/logger`).getLogger();
const DEFAULT_PORT = process.env.DEFAULT_PORT;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return logger.error(`Ошибка при создании сервера: ${err}`);
      }

      return logger.info(`Ожидаю соединений на ${port} info 2`);
    });
  }
};
