'use strict';

const fs = require(`fs`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const {
  ExitCode,
} = require(`../../constants`);

const {
  TITLES,
  SENTENCES,
  CATEGORIES,
  OfferType,
  SumRestrict,
} = require(`./generate-data-for-mock`);

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
 * @return {string[]}
 */
const getCategories = () => {
  return [...new Set(new Array(getRandomInt(1, CATEGORIES.length - 1))
    .fill(undefined)
    .map(() => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]
  ))]
};

/**
 * Генерация массива случайных объявлений
 * @param {number} count
 * @return {object[]}
 */
const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
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
      console.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      console.info(`Operation success. File created.`);
    });
  }
};
