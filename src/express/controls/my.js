'use strict';

const {getOffers} = require(`../api/offers`);
const {getCommentsByOfferId} = require(`../api/comments`);

const ctrlMyMain = async (req, res) => {
  try {
    const offers = await getOffers()
      .then((response) => {
        return response.data.items;
      });
    return res.render(`my-tickets`, {offers});
  } catch (e) {
    return res.status(500).render(`errors/500`);
  }
};
const ctrlMyComments = async (req, res) => {
  try {
    const offers = await getOffers()
      .then((response) => {
        return response.data.items
          .slice(0, 3);
      });
    const offersIds = offers.map((it) => it.id);
    await Promise.all(offersIds.map((id) => getCommentsByOfferId(id)))
      .then((results) => {
        results.forEach((it, index) => {
          offers[index].comments = it.data.items;
        });
      });
    return res.render(`comments`, {offers});
  } catch (e) {
    return res.status(500).render(`errors/500`);
  }
};

module.exports = {
  ctrlMyMain,
  ctrlMyComments,
};
