'use strict';

const fs = require(`fs`);
require(`../../../../utils/env`);
const FILE_NAME = process.env.MOCK_DATA_FILE_NAME;

const getAllOffers = () => {
  const fileContent = fs.readFileSync(FILE_NAME);
  return JSON.parse(fileContent);
};

const offers = getAllOffers();

module.exports = {
  offers,
};
