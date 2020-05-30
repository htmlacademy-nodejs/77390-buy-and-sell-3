'use strict';

const {getOffers, getDiscussedOffers} = require(`../api/offers`);

const ctrlMain = async (req, res) => {
  try {
    const offers = await getOffers({offsetStart: 0, offsetEnd: 8})
      .then((response) => {
        return response.data.items;
      });
    const discussedOffers = await getDiscussedOffers()
      .then((response) => {
        return response.data.items;
      });
    return res.render(`main`, {offers, discussedOffers});
  } catch (e) {
    return res.status(500).render(`errors/500`);
  }
};

module.exports = {
  ctrlMain,
};
