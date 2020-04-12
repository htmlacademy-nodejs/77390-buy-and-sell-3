'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/category/:id`, (req, res) => res.send(`/offers/category/:id`));
router.get(`/add`, (req, res) => res.send(`/offers/add`));
router.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/:id`));
router.get(`/:id`, (req, res) => res.send(`/offers/:id`));

module.exports = router;
