'use strict';

const {Router} = require(`express`);
const router = new Router();
const {ctrlOffersMain} = require(`../controls/offers`)

router.get(`/`, ctrlOffersMain);

module.exports = router;
