'use strict';

require(`../../utils/env`);
const fs = require(`fs`).promises;

const {getItemsSuccessResponse} = require(`../../utils/get-response`);

const FILE_NAME = process.env.MOCK_DATA_FILE_NAME;

const ctrlOffersMain = async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.json(getItemsSuccessResponse(mocks, {total: mocks.length}));
  } catch (err) {
    res.json(getItemsSuccessResponse([], {total: 0}));
  }
};

module.exports = {
  ctrlOffersMain,
};
