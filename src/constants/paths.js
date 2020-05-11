'use strict';

const path = require(`path`);

const PATH_TO_DATA = path.join(__dirname, `..`, `data`);
const PATH_TO_LOGS = path.join(__dirname, `..`, `service`, `logs`);

module.exports = {
  PATH_TO_DATA,
  PATH_TO_LOGS,
};
