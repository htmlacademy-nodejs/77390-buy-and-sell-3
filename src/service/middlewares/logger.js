'use strict';

const logger = require(`../../utils/logger`).getLogger();
const loggerUrlMiddleware = (req, res, next) => {
  const url = req.originalUrl;
  const mergingObject = {url};
  const message = `url: ${url}`;
  logger.debug(mergingObject, message);
  next();
};

const loggerStatusMiddleware = (req, res, next) => {
  res.on(`finish`, function () {
    const status = res.statusCode;
    const url = req.originalUrl;
    const method = req.method;
    const mergingObject = {status, url, method};
    const message = `response.status: ${status}, url: ${url}`;
    logger.info(mergingObject, message);
    if (status > 299) {
      const error = res.locals.error || undefined;
      const messageAppend = error && error.message ? `, error.message: ${error.message}` : ``;
      const reqBody = req.body;
      logger.error({...mergingObject, error, reqBody}, `${message}${messageAppend}`);
    }
  });
  next();
};

module.exports = {
  loggerUrlMiddleware,
  loggerStatusMiddleware,
};
