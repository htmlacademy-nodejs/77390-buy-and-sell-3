'use strict';

const {sendHtmlResponse} = require(`../utils/server`);
const {HttpCode} = require(`../constants`);

const MESSAGE_TEXT = `Not found`;

const ctrlNotFound = async (req, res) => {
  sendHtmlResponse(res, HttpCode.NOT_FOUND, MESSAGE_TEXT);
};

module.exports = {
  ctrlNotFound,
};
