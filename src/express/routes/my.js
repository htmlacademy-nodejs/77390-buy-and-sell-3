'use strict';

const {Router} = require(`express`);
const router = new Router();
const {ctrlMyMain, ctrlMyComments} = require(`../controls/my`);

router.get(`/`, ctrlMyMain);
router.get(`/comments`, ctrlMyComments);

module.exports = router;
