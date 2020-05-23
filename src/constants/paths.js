'use strict';

require(`../utils/env`);
const path = require(`path`);

const UPLOADS_DIR = process.env.UPLOADS_DIR;

const PATH_TO_DATA = path.join(__dirname, `..`, `data`);
const PATH_TO_LOGS = path.join(__dirname, `..`, `service`, `logs`);
const PATH_TO_UPLOADS_DIR = path.join(__dirname, `..`, UPLOADS_DIR);

module.exports = {
  PATH_TO_DATA,
  PATH_TO_LOGS,
  PATH_TO_UPLOADS_DIR,
};
