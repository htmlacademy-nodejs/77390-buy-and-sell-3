'use strict';

const {Router} = require(`express`);
const router = Router();
const routerOffers = require(`./offers`);
const routerCategories = require(`./categories`);
const routerSearch = require(`./search`);

router.use(`/offers`, routerOffers);
router.use(`/categories`, routerCategories);
router.use(`/search`, routerSearch);

module.exports = router;
