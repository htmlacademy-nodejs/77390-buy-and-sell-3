'use strict';

const {Router} = require(`express`);
const {upload} = require(`../middlewares/upload`);
const router = new Router();
const {
  ctrlOffersCategory,
  ctrlOfferAddRender,
  ctrlOfferAddSend,
  ctrlOfferEdit,
  ctrlOfferGet,
} = require(`../controls/offers`);

router.get(`/category/:id`, ctrlOffersCategory);
router.get(`/add`, ctrlOfferAddRender);
router.post(`/add`, upload.single(`avatar`), ctrlOfferAddSend);
router.get(`/edit/:id`, ctrlOfferEdit);
router.get(`/:id`, ctrlOfferGet);

module.exports = router;
