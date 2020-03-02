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
 * Перетасовка массива алгоритмом тасования Фишера-Йетса
 * @param {array} someArray
 * @return {array}
 */
module.exports.shuffle = (someArray) => {
  const result = someArray.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [result[i], result[randomPosition]] = [result[randomPosition], result[i]];
  }

  return result;
};
