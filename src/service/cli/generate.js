'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);
const nanoid = require(`nanoid`).nanoid;
require(`../../utils/env`);

const {print} = require(`../../utils/print`);
const {
  readFileToArray,
} = require(`../../utils/files`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils/data`);

const {
  ExitCode,
} = require(`../../constants/cli`);

const {
  PATH_TO_DATA,
} = require(`../../constants/paths`);

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const DEFAULT_COUNT = 1;
const FILE_NAME = process.env.MOCK_DATA_FILE_NAME;
const MAX_COMMENTS = 5;

const FILE_TITLES_PATH = path.join(PATH_TO_DATA, `titles.txt`);
const FILE_SENTENCES_PATH = path.join(PATH_TO_DATA, `sentences.txt`);
const FILE_CATEGORIES_PATH = path.join(PATH_TO_DATA, `categories.txt`);
const FILE_COMMENTS_PATH = path.join(PATH_TO_DATA, `comments.txt`);
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
    ))];
};

/**
 * @return {Promise<{sentences: Array, titles: Array, categories: Array}>}
 */
const getMockData = async () => {
  try {
    const [titles, sentences, categories, comments] = await Promise.all([
      readFileToArray(FILE_TITLES_PATH),
      readFileToArray(FILE_SENTENCES_PATH),
      readFileToArray(FILE_CATEGORIES_PATH),
      readFileToArray(FILE_COMMENTS_PATH),
    ]);
    return {
      titles,
      sentences,
      categories,
      comments,
    };
  } catch (e) {
    throw e;
  }
};

/**
 * Генерация массива случайных объявлений
 * @param {array} comments
 * @return {object[]}
 */
const generateComments = (comments) => {
  const maxSentencesInComment = comments.length;
  return Array(getRandomInt(1, MAX_COMMENTS))
    .fill(undefined)
    .map(() => ({
      id: nanoid(),
      text: shuffle(comments)
        .slice(1, getRandomInt(2, maxSentencesInComment - 1))
        .join(` `),
    }));
};

/**
 * Генерация массива случайных объявлений
 * @param {array} data.titles
 * @param {array} data.sentences
 * @param {array} data.categories
 * @param {object} data
 * @param {number} count
 * @return {object[]}
 */
const generateOffers = (data, count) => {
  const {titles, sentences, categories, comments} = data;
  return Array(count).fill({}).map(() => ({
    id: nanoid(),
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(),
    description: shuffle(sentences).slice(1, 5).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: getCategories(categories),
    comments: generateComments(comments),
  }));
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count, beautiful] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    /**
     * Нужно ли красивое оформление результатов
     * @type {boolean}
     */
    const isBeautiful = beautiful === `beautiful`;
    let content;
    if (countOffer > 1000) {
      print(`Не больше 1000 объявлений`, {status: `error`});
      process.exit(ExitCode.error);
    }


    try {
      const data = await getMockData();
      content = JSON.stringify(
          generateOffers(data, countOffer), null, isBeautiful ? 2 : 0
      );
    } catch (e) {
      print(`Не могу получить данные для генерации: ${e}`, {status: `error`});
      process.exit(ExitCode.error);
    }

    try {
      await fs.writeFile(FILE_NAME, content);
      print(`Успешно. Файл создан`, {status: `success`});
    } catch (e) {
      print(`Не могу создать файл: ${e}`, {status: `error`});
      process.exit(ExitCode.error);
    }

  }
};
