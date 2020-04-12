'use strict';

const {sendHtmlResponse} = require(`../utils/server`);
const {HttpCode} = require(`../constants/http`);
const {MESSAGE_NOT_FOUND} = require(`../constants/messages`);

const ctrlNotFound = async (req, res) => {
  sendHtmlResponse(res, HttpCode.NOT_FOUND, MESSAGE_NOT_FOUND);
};

module.exports = {
  ctrlNotFound,
};
