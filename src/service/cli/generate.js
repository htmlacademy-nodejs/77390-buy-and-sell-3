'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);

const {log} = require(`../../utils/log`);
const {readFileToArray} = require(`../../utils/files`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils/data`);

const {
  ExitCode,
} = require(`../../constants`);

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

const FILE_TITLES_PATH = path.join(__dirname, '..', '..', 'data', 'titles.txt');
const FILE_SENTENCES_PATH = path.join(__dirname, '..', '..', 'data', 'sentences.txt');
const FILE_CATEGORIES_PATH = path.join(__dirname, '..', '..', 'data', 'categories.txt');
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
 * @param {[]} allCategories
 * @return {[]}
 */
const getCategories = (allCategories) => {
  return [...new Set(new Array(getRandomInt(1, allCategories.length - 1))
    .fill(undefined)
    .map(() => allCategories[getRandomInt(0, allCategories.length - 1)]
    ))]
};

/**
 * Генерация массива случайных объявлений
 * @param {number} count
 * @return {object[]}
 */
const generateOffers = async (count) => {
  try {
    const [titles, sentences, categories] = await Promise.all([
      readFileToArray(FILE_TITLES_PATH),
      readFileToArray(FILE_SENTENCES_PATH),
      readFileToArray(FILE_CATEGORIES_PATH),
    ]);
    return Array(count).fill({}).map(() => ({
      title: titles[getRandomInt(0, titles.length - 1)],
      picture: getPictureFileName(),
      description: shuffle(sentences).slice(1, 5).join(` `),
      type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      category: getCategories(categories),
    }))
  } catch (e) {
    throw e;
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    let content;
    if (countOffer > 1000) {
      log(`Не больше 1000 объявлений`, {status: 'error'});
      process.exit(ExitCode.error);
    }


    try {
      content = JSON.stringify(await generateOffers(countOffer));
    } catch (e) {
      log(`Не могу прочитать контент: ${e}`, {status: 'error'});
      process.exit(ExitCode.error);
    }

    try {
      await fs.writeFile(FILE_NAME, content);
      log(`Успешно. Файл создан`, {status: 'success'});
    } catch (e) {
      log(`Не могу создать файл: ${e}`, {status: 'error'});
      process.exit(ExitCode.error);
    }

  }
};
