'use strict';

const queryString = require(`query-string`);
const {rp, getOptionsRp, getFullUrl} = require(`./request`);

const getOffers = (params = {}) => {
  const {
    sortDirection,
    sortBy,
    offsetStart,
    offsetEnd,
  } = params;
  const getString = queryString.stringify({
    sortDirection,
    sortBy,
    offsetStart,
    offsetEnd,
  });
  let url = getFullUrl(`/offers`);
  url = getString ? `${url}?${getString}` : url;
  return rp(getOptionsRp(url, `GET`));
};

const getDiscussedOffers = (params = {}) => {
  const {
    offsetStart = 0,
    offsetEnd = 8,
  } = params;
  return getOffers({
    sortDirection: `desc`,
    sortBy: `comments`,
    offsetStart,
    offsetEnd,
  });
};

const getRecentlyOffers = (params = {}) => {
  const {
    offsetStart = 0,
    offsetEnd = 8,
  } = params;
  return getOffers({
    sortDirection: `desc`,
    sortBy: `createdDate`,
    offsetStart,
    offsetEnd,
  });
};

const getOfferByOfferId = (offerId) => {
  const url = getFullUrl(`/offers/${offerId}`);
  return rp(getOptionsRp(url, `GET`));
};

const addOffer = (item) => {
  const url = getFullUrl(`/offers/`);
  return rp(getOptionsRp(url, `POST`, {
    body: {
      item,
    }
  }
  ));
};

const searchOffers = (params) => {
  const {
    query,
    offsetStart,
    offsetEnd,
  } = params;
  const getString = queryString.stringify({
    query,
    offsetStart,
    offsetEnd,
  });
  let url = getFullUrl(`/search`);
  url = getString ? `${url}?${getString}` : url;
  return rp(getOptionsRp(url, `GET`));
};

module.exports = {
  getOffers,
  getDiscussedOffers,
  getRecentlyOffers,
  getOfferByOfferId,
  addOffer,
  searchOffers,
};
