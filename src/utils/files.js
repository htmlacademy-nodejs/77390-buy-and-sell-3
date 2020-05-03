'use strict';

const fs = require(`fs`).promises;

/**
 * Чтение файла и возврат строк в виде массива
 * @param {string} filePath
 * @return {array}
 */
const readFileToArray = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content
      .trim()
      .split(`\n`)
      .map((el) => el.trim())
      .filter((el) => el !== ``);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  readFileToArray,
};
