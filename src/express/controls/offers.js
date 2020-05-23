'use strict';

const fs = require(`fs`);
const queryString = require(`query-string`);
const {getOfferByOfferId, addOffer} = require(`../api/offers`);
const {getCategories} = require(`../api/categories`);

const ctrlOffersCategory = async (req, res) => {
  return res.render(`category`);
};

const ctrlOfferAddGet = async (req, res) => {
  try {
    let {error, failFields, item} = req.query;
    const failFieldsById = failFields ? JSON.parse(failFields).reduce((acc, field) => {
      return {
        ...acc,
        [field.id]: field,
      };
    }, {}) : {};
    item = item ? JSON.parse(item) : {};
    const categories = await getCategories().then((response) => response.data.items);
    return res.render(`new-ticket`, {categories, error, failFieldsById, item});
  } catch (e) {
    console.log(e);
    return res.status(500).render(`errors/500`);
  }
};

const ctrlOfferAddPost = async (req, res) => {
  const {categories} = req.body;
  const {file} = req;
  const item = {
    title: req.body.title,
    categories: Array.isArray(categories) ? categories : [categories],
    description: req.body.description,
    sum: +req.body.sum,
    type: req.body.type,
    file,
  };
  try {
    await addOffer(item)
      .then((response) => response.data.item);
    return res.redirect(`/my`);
  } catch (e) {
    if (file && file.path) {
      fs.unlinkSync(file.path);
    }
    const errorMessage = e.error && e.error.error && e.error.error.message || e.toString();
    const failFields = e.error && e.error.failFields || [];
    const query = queryString.stringify({
      error: errorMessage,
      failFields: JSON.stringify(failFields),
      item: JSON.stringify(item),
    });
    return res.redirect(`/offers/add?${query}`);
  }
};

const ctrlOfferEdit = async (req, res) => {
  try {
    const offerId = req.params.id;
    const [offer, categories] = await Promise.all([
      await getOfferByOfferId(offerId)
        .then((response) => {
          return response.data.item;
        }),
      await getCategories()
        .then((response) => {
          return response.data.items;
        }),
    ]);
    return res.render(`ticket-edit`, {offer, categories});
  } catch (e) {
    return res.status(500).render(`errors/500`);
  }
};

const ctrlOfferGet = async (req, res) => {
  return res.render(`ticket`);
};

module.exports = {
  ctrlOffersCategory,
  ctrlOfferAddGet,
  ctrlOfferAddPost,
  ctrlOfferEdit,
  ctrlOfferGet,
};
