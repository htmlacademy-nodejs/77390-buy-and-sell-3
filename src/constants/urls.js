'use strict';

require(`../utils/env`);
const API_PREFIX = process.env.API_PREFIX || `/api`;
const API_SCHEME = process.env.API_SCHEME || `http`;
const API_HOST = process.env.API_HOST || `localhost`;
const API_PORT = process.env.PORT_SERVICE_SERVER || 3000;
const API_BASE_URL = `${API_SCHEME}://${API_HOST}:${API_PORT}${API_PREFIX}`;
const API_DOMAIN = `${API_SCHEME}://${API_HOST}:${API_PORT}`;

module.exports = {
  API_PREFIX,
  API_BASE_URL,
  API_DOMAIN,
};
