'use strict';

const fs = require(`fs`);

const {log} = require(`../../utils/log`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils/data`);

const {
  ExitCode,
} = require(`../../constants`);

const titles = require(`../../data/titles`).data;
const sentences = require(`../../data/sentences`).data;
const categories = require(`../../data/categories`).data;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

/**
 * Генерация рандомного имени для изображения
 * @return {string}
 */
const getPictureFileName = () => {
  const number = getRandomInt(0, 16);
  return number >= 10 ? `item${number}.jpg` : `item0${number}.jpg`;
};

/**
 * Генерация массива категорий
 * @return {[]}
 */
const getCategories = () => {
  return [...new Set(new Array(getRandomInt(1, categories.length - 1))
    .fill(undefined)
    .map(() => categories[getRandomInt(0, categories.length - 1)]
  ))]
};

/**
 * Генерация массива случайных объявлений
 * @param {number} count
 * @return {object[]}
 */
const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(),
    description: shuffle(sentences).slice(1, 5).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: getCategories(),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > 1000) {
      log(`Не больше 1000 объявлений`, {status: 'error'});
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        log(`Не могу создать файл`, {status: 'error'});
        process.exit(ExitCode.error);
      }
      log(`Успешно. Файл создан`, {status: 'success'});
    });
  }
};
