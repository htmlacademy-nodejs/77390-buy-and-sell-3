'use strict';

const fs = require(`fs`).promises;
require(`../utils/env`);

const {sendHtmlResponse} = require(`../utils/server`);
const {ctrlNotFound} = require(`./not-found`);
const {HttpCode} = require(`../constants`);

const FILE_NAME = process.env.MOCK_DATA_FILE_NAME;

const ctrlHome = async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    const list = mocks.map((it) => `<li>${it.title}</li>`).join(``);
    sendHtmlResponse(res, HttpCode.OK, `<ul>${list}</ul>`);
  } catch (err) {
    await ctrlNotFound(req, res);
  }
};

module.exports = {
  ctrlHome,
};
