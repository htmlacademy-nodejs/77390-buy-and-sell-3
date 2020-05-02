'use strict';

const {Router} = require(`express`);
const router = new Router();
const {
  ctrlGetOffers,
  ctrlAddOffer,
  ctrlGetOffer,
  ctrlUpdateOffer,
  ctrlRemoveOffer,
  ctrlGetOfferComments,
  ctrlAddOfferComment,
  ctrlRemoveOfferComment,
} = require(`../../controls/api/offers`);

router.get(`/`, ctrlGetOffers);
router.post(`/`, ctrlAddOffer);
router.get(`/:offerId`, ctrlGetOffer);
router.put(`/:offerId`, ctrlUpdateOffer);
router.delete(`/:offerId`, ctrlRemoveOffer);
router.get(`/:offerId/comments`, ctrlGetOfferComments);
router.post(`/:offerId/comments`, ctrlAddOfferComment);
router.delete(`/:offerId/comments/:commentId`, ctrlRemoveOfferComment);

module.exports = router;
