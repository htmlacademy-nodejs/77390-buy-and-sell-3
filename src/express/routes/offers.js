'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/category/:id`, (req, res) => res.render(`category`));
router.get(`/add`, (req, res) => res.render(`new-ticket`));
router.get(`/edit/:id`, (req, res) => res.render(`ticket-edit`));
router.get(`/:id`, (req, res) => res.render(`ticket`));

module.exports = router;
