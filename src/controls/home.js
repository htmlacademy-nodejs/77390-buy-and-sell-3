'use strict';

const fs = require(`fs`).promises;

const {sendHtmlResponse} = require(`../utils/server`);
const {ctrlNotFound} = require(`./not-found`);
const {HttpCode} = require(`../constants`);

const FILENAME = `mocks.json`;

const ctrlHome = async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
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
