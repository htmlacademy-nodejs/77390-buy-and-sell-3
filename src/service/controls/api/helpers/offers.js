'use strict';

require(`../../../../utils/env`);
const fs = require(`fs`);
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
