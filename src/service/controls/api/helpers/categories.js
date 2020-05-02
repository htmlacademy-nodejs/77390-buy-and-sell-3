'use strict';

const path = require(`path`);

const {
  readFileToArray,
} = require(`../../../../utils/files`);

const {
  PATH_TO_DATA,
} = require(`../../../../constants/paths`);

const FILE_CATEGORIES_PATH = path.join(PATH_TO_DATA, 'categories.txt');

const getCategories = () => {
  return readFileToArray(FILE_CATEGORIES_PATH);
};

module.exports = {
  getCategories,
}
