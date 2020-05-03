'use strict';

const {
  offers,
} = require(`./helpers/offers`);

const {
  getItemsSuccessResponse,
} = require(`../../../utils/get-response`);

const ctrlSearch = async (req, res) => {
  try {
    const {query} = req.query;
    const items = query ?
      offers.filter((it) => it.title.toLowerCase().includes(query.toLowerCase())) :
      offers;
    res.json(getItemsSuccessResponse(items, {total: items.length}));
  } catch (err) {
    res.json(getItemsSuccessResponse([], {total: 0}));
  }
};

module.exports = {
  ctrlSearch
};
