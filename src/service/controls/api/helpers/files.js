'use strict';

const path = require(`path`);
const {API_DOMAIN} = require(`../../../../constants/urls`);
const {PATH_TO_UPLOADS_DIR} = require(`../../../../constants/paths`);

const getPictureUrl = (file) => {
  if (!file || !file.path) {
    return ``;
  }
  return `${API_DOMAIN}${path
    .join(process.env.UPLOADS_DIR, path.relative(PATH_TO_UPLOADS_DIR, file.path))}`;
};

module.exports = {
  getPictureUrl,
};
