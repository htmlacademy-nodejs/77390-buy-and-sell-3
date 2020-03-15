'use strict';

const colors = require(`colors`);

colors.setTheme({
  default: `white`,
  info: `green`,
  warn: `yellow`,
  error: `red`,
  debug: `blue`
});

/**
 * Утилита логирования
 * @param {string} message
 * @param {object=} options
 * @param {'default' | 'info' | 'warn' | 'error' | 'debug'=} options.status?
 */
const log = (message, options) => {
  console.log(message[options && options.status || `default`]);
};

module.exports = {
  log,
};
