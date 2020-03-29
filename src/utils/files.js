const fs = require('fs').promises;
const {log} = require('./log');

/**
 * Чтение файла и возврат строк в виде массива
 * @param {string} filePath
 * @return {array}
 */
const readFileToArray = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  readFileToArray,
};
