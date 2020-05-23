'use strict';

const {Router} = require(`express`);
const {upload} = require(`../middlewares/upload`);
const router = new Router();
const {
  ctrlOffersCategory,
  ctrlOfferAddGet,
  ctrlOfferAddPost,
  ctrlOfferEdit,
  ctrlOfferGet,
} = require(`../controls/offers`);

router.get(`/category/:id`, ctrlOffersCategory);
router.get(`/add`, ctrlOfferAddGet);
router.post(`/add`, upload.single(`avatar`), ctrlOfferAddPost);
router.get(`/edit/:id`, ctrlOfferEdit);
router.get(`/:id`, ctrlOfferGet);

module.exports = router;
