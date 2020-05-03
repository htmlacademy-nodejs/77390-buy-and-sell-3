'use strict';

const {Router} = require(`express`);
const router = new Router();
const {
  ctrlGetCategories,
} = require(`../../controls/api/categories`);

router.get(`/`, ctrlGetCategories);

module.exports = router;
