'use strict';

const {rp, getOptionsRp, getFullUrl} = require(`./request`);

const getCommentsByOfferId = (offerId) => {
  const url = getFullUrl(`/offers/${offerId}/comments`);
  return rp(getOptionsRp(url, `GET`));
};

module.exports = {
  getCommentsByOfferId,
};
