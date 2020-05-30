'use strict';

const rp = require(`request-promise`);
const {API_BASE_URL} = require(`../../constants/urls`);

const getFullUrl = (url) => {
  return `${API_BASE_URL}${url}`;
};

const optionsRp = {
  json: true,
};

const getOptionsRp = (url, method, otherOptions) => {
  return {
    ...optionsRp,
    url,
    method,
    ...otherOptions,
  };
};

module.exports = {
  rp,
  getOptionsRp,
  getFullUrl,
};
