'use strict';

/**
 * Эмулация паузы
 * @param {number} ms
 * @return {Promise<unknown>}
 */
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

module.exports = {
  sleep,
};
