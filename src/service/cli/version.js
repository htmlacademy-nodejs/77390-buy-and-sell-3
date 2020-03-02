'use strict';

const packageJsonFile = require('../../../package');
const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    console.info(version);
  }
};
