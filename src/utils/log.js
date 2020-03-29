'use strict';

const colors = require(`colors`);

colors.setTheme({
  default: `white`,
  info: `blue`,
  success: `green`,
  warn: `yellow`,
  error: `red`,
  debug: `blue`,
});

/**
 * Утилита логирования
 * @param {string} message
 * @param {object=} options
 * @param {'default' | 'info' | 'success' | 'warn' | 'error' | 'debug' | 'help' =} options.status?
 * @param {string =} options.color?
 */
const log = (message, options = {}) => {
  const {color, status} = options;
  console.log(message.toString()[color || status || `default`]);
};

module.exports = {
  log,
};
