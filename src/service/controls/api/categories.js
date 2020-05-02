'use strict';

const {
  getCategories,
} = require(`./helpers/categories`);

const {
  getItemsSuccessResponse,
  getErrorResponse,
} = require(`../../../utils/get-response`);

const {
  HttpCode,
} = require(`../../../constants/http`);

const {
  MESSAGE_INTERNAL_SERVER_ERROR,
} = require(`../../../constants/messages`);

const ctrlGetCategories = async (req, res) => {
  try {
    const items = await getCategories();
    res.json(getItemsSuccessResponse(items, {total: items.length}));
  } catch (err) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(getErrorResponse(MESSAGE_INTERNAL_SERVER_ERROR, HttpCode.INTERNAL_SERVER_ERROR));
  }
};

module.exports = {
  ctrlGetCategories,
};
