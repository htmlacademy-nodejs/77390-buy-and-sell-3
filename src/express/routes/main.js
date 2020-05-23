'use strict';

const {Router} = require(`express`);
const router = new Router();
const {ctrlMain} = require(`../controls/main`);
const {ctrlRegister} = require(`../controls/register`);
const {ctrlLogin} = require(`../controls/login`);
const {ctrlSearch} = require(`../controls/search`);

router.get(`/`, ctrlMain);
router.get(`/register`, ctrlRegister);
router.get(`/login`, ctrlLogin);
router.get(`/search`, ctrlSearch);

module.exports = router;
