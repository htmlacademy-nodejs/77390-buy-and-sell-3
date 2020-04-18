'use strict';

const {HttpCode} = require(`../../constants/http`);
const {MESSAGE_NOT_FOUND} = require(`../../constants/messages`);
const {getErrorResponse} = require(`../../utils/get-response`);

const ctrlNotFound = async (req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .send(getErrorResponse(MESSAGE_NOT_FOUND, HttpCode.NOT_FOUND));
};

module.exports = {
  ctrlNotFound,
};
