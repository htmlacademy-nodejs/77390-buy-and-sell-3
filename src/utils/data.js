'use strict';

/**
 * Отдает рандомное число в диапазоне от min до max
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Перетасовка массива
 * @param {array} someArray
 * @return {array}
 */
module.exports.shuffle = (someArray) => {
  return someArray
    .slice()
    .sort(() => 0.5 - Math.random());
};
