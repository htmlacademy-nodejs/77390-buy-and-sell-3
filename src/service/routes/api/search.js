'use strict';

const {Router} = require(`express`);
const router = new Router();
const {
  ctrlSearch,
} = require(`../../controls/api/search`);

router.get(`/`, ctrlSearch);

module.exports = router;
