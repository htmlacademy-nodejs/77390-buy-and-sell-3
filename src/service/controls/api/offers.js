'use strict';

const nanoid = require(`nanoid`).nanoid;
const Ajv = require(`ajv`);

const {
  offers,
} = require(`./helpers/offers`);
const {HttpCode} = require(`../../../constants/http`);
const {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_OFFER_NOT_FOUND,
  MESSAGE_OFFER_BED_FIELD,
} = require(`../../../constants/messages`);

const {
  getItemsSuccessResponse,
  getItemSuccessResponse,
  getErrorResponse,
  getFailFields,
} = require(`../../../utils/get-response`);

const schemaOffers = require(`../../../schemas/offers.json`);

const ajv = new Ajv({allErrors: true, jsonPointers: true});
require(`ajv-errors`)(ajv, {singleError: false});

const ctrlGetOffers = async (req, res) => {
  try {
    res.json(getItemsSuccessResponse(offers, {total: offers.length}));
  } catch (err) {
    res.json(getItemsSuccessResponse([], {total: 0}));
  }
};

const ctrlAddOffer = async (req, res) => {
  try {
    const offer = {
      id: nanoid(),
      ...req.body.item,
    };
    const valid = ajv.validate(schemaOffers, offer);
    if (!valid) {
      const failFields = getFailFields(ajv.errors);
      res.locals.error = {
        message: MESSAGE_OFFER_BED_FIELD,
        code: HttpCode.BAD_REQUEST,
        failFields,
      };
      res
        .status(HttpCode.BAD_REQUEST)
        .json(getErrorResponse(MESSAGE_OFFER_BED_FIELD, HttpCode.BAD_REQUEST, {
          failFields,
        }));
    } else {
      offers.push(offer);
      res.json(getItemSuccessResponse(offer));
    }
  } catch (err) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(getErrorResponse(MESSAGE_INTERNAL_SERVER_ERROR, HttpCode.INTERNAL_SERVER_ERROR));
  }
};

const ctrlGetOffer = async (req, res) => {
  try {
    const id = req.params.offerId;
    const offer = offers.find((it) => it.id === id);
    if (offer) {
      res.json(getItemSuccessResponse(offer));
    } else {
      res
        .status(HttpCode.NOT_FOUND)
        .json(getErrorResponse(MESSAGE_OFFER_NOT_FOUND, HttpCode.NOT_FOUND));
    }
  } catch (err) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(getErrorResponse(MESSAGE_INTERNAL_SERVER_ERROR, HttpCode.INTERNAL_SERVER_ERROR));
  }
};

const ctrlUpdateOffer = async (req, res) => {
  try {
    const id = req.params.offerId;
    const newOffer = req.body.item;
    const index = offers.findIndex((it) => it.id === id);
    if (index !== -1) {
      const offer = {
        ...offers[index],
        ...newOffer,
      };
      const valid = ajv.validate(schemaOffers, offer);
      if (!valid) {
        res
          .status(HttpCode.BAD_REQUEST)
          .json(getErrorResponse(MESSAGE_OFFER_BED_FIELD, HttpCode.BAD_REQUEST, {
            failFields: getFailFields(ajv.errors),
          }));
      } else {
        offers[index] = offer;
        res.json(getItemSuccessResponse(offer));
      }
    } else {
      res
        .status(HttpCode.NOT_FOUND)
        .json(getErrorResponse(MESSAGE_OFFER_NOT_FOUND, HttpCode.NOT_FOUND));
    }
  } catch (err) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(getErrorResponse(MESSAGE_INTERNAL_SERVER_ERROR, HttpCode.INTERNAL_SERVER_ERROR));
  }
};

const ctrlRemoveOffer = async (req, res) => {
  try {
    const id = req.params.offerId;
    const index = offers.findIndex((it) => it.id === id);
    if (index !== -1) {
      offers.splice(index, 1);
    }
    res.status(HttpCode.NO_CONTENT).send();
  } catch (err) {
    console.log(err);
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(getErrorResponse(MESSAGE_INTERNAL_SERVER_ERROR, HttpCode.INTERNAL_SERVER_ERROR));
  }
};

const ctrlGetOfferComments = async (req, res) => {
  try {
    const id = req.params.offerId;
    const offer = offers.find((it) => it.id === id);
    if (offer) {
      const comments = offer.comments || [];
      res.json(getItemsSuccessResponse(comments, {total: comments.length}));
    } else {
      res
        .status(HttpCode.NOT_FOUND)
        .json(getErrorResponse(MESSAGE_OFFER_NOT_FOUND, HttpCode.NOT_FOUND));
    }
  } catch (err) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(getErrorResponse(MESSAGE_INTERNAL_SERVER_ERROR, HttpCode.INTERNAL_SERVER_ERROR));
  }
};

const ctrlAddOfferComment = async (req, res) => {
  try {
    const id = req.params.offerId;
    const offer = offers.find((it) => it.id === id);
    if (offer) {
      const comments = offer.comments || [];
      const comment = {
        id: nanoid(),
        ...req.body.item,
      };
      comments.push(comment);
      offer.comments = comments;
      res.json(getItemSuccessResponse(comment));
    } else {
      res
        .status(HttpCode.NOT_FOUND)
        .json(getErrorResponse(MESSAGE_OFFER_NOT_FOUND, HttpCode.NOT_FOUND));
    }
  } catch (err) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(getErrorResponse(MESSAGE_INTERNAL_SERVER_ERROR, HttpCode.INTERNAL_SERVER_ERROR));
  }
};


const ctrlRemoveOfferComment = async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const commentId = req.params.commentId;
    const offer = offers.find((it) => it.id === offerId);
    if (offer) {
      const comments = offer.comments || [];
      const commentIndex = comments.findIndex((it) => it.id === commentId);
      if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
      }
      res.status(HttpCode.NO_CONTENT).send();
    } else {
      res
        .status(HttpCode.NOT_FOUND)
        .json(getErrorResponse(MESSAGE_OFFER_NOT_FOUND, HttpCode.NOT_FOUND));
    }
  } catch (err) {
    console.log(err);
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json(getErrorResponse(MESSAGE_INTERNAL_SERVER_ERROR, HttpCode.INTERNAL_SERVER_ERROR));
  }
};


module.exports = {
  ctrlGetOffers,
  ctrlAddOffer,
  ctrlGetOffer,
  ctrlUpdateOffer,
  ctrlRemoveOffer,
  ctrlGetOfferComments,
  ctrlAddOfferComment,
  ctrlRemoveOfferComment,
};
