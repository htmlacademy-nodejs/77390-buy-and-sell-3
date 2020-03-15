'use strict';

const {log} = require(`../../utils/log`);

const packageJsonFile = require(`../../../package`);
const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    log(version, {status: `info`});
  }
};
