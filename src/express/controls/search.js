'use strict';

const {searchOffers, getRecentlyOffers} = require(`../api/offers`);

const ctrlSearch = async (req, res) => {
  const {query} = req.query;
  try {
    const [offers, total] = await searchOffers({query})
      .then((response) => {
        return [response.data.items, response.total];
      });
    const recentlyOffers = await getRecentlyOffers()
      .then((response) => {
        return response.data.items;
      });
    return res.render(`search-result`, {offers, total, recentlyOffers});
  } catch (e) {
    return res.status(500).render(`errors/500`);
  }
};

module.exports = {
  ctrlSearch,
};
