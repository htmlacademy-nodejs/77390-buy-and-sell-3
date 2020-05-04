'use strict';

const fs = require(`fs`);
require(`../../../../utils/env`);
const FILE_NAME = process.env.MOCK_DATA_FILE_NAME;

const getAllOffers = () => {
  try {
    const fileContent = fs.readFileSync(FILE_NAME);
    return JSON.parse(fileContent);
  } catch (e) {
    return [];
  }
};

const offers = getAllOffers();

module.exports = {
  offers,
};
