'use strict';

const {print} = require(`../../utils/print`);

const packageJsonFile = require(`../../../package`);
const version = packageJsonFile.version;

module.exports = {
  name: `--version`,
  run() {
    print(version, {status: `info`});
  }
};
