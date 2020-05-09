'use strict';

const fs = require(`fs`);
const path = require(`path`);
const pino = require(`pino`);
const pinoms = require(`pino-multi-stream`);

const {PATH_TO_LOGS} = require(`../constants/paths`);

const level = process.env.LOG_LEVEL || `info`;

const prettyStream = pinoms.prettyStream({
  prettyPrint: {
    translateTime: `SYS:standard`,
    ignore: `hostname,error,reqBody,status,url,method`
  }
});

if (!fs.existsSync(PATH_TO_LOGS)) {
  fs.mkdirSync(PATH_TO_LOGS);
}

const streams = [
  {level, stream: prettyStream},
  {level, stream: fs.createWriteStream(path.join(PATH_TO_LOGS, `${level}.stream.out`))},
  {level: `error`, stream: fs.createWriteStream(path.join(PATH_TO_LOGS, `error.stream.out`))},
  {level: `fatal`, stream: fs.createWriteStream(path.join(PATH_TO_LOGS, `fatal.stream.out`))}
];

const logger = pino({
  name: `app::service`,
  level,
  enabled: !process.env.NOLOG,
}, pinoms.multistream(streams));


module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
