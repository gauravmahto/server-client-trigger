/**
 * Author - gmahto@avst.com
 */

// Description:
// This is a default logger.
// The intention is to provide a file and console based logger that should be used instead of 'console.log'.

import path from 'path';

import moment from 'moment';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

import { makePathSync } from 'utils/utils';

const logConfig = {
  level: 'silly',
  console: {
    label: '',
    prettyPrint: true,
    colorize: true,
    exitOnError: false,
    json: false,
    timestamp: () => moment().format('DD-MM-YYYY HH:mm:ss')
  },
  file: {
    label: 'perforce-webclient',
    filename: 'app.log',
    dir: 'logs',
    maxDays: 1,
    exitOnError: false,
    json: false,
    timestamp: () => moment().format('DD-MM-YYYY HH:mm:ss')
  }
};
const transports: winston.TransportInstance[] = [];
let logger: winston.LoggerInstance;

// Add file based logger transport.
if (logConfig.file) {

  const fileConfig = logConfig.file;

  // Make path relative to the root dir.
  fileConfig.filename = path.join(global.APP_ROOT_DIR,
    fileConfig.dir, fileConfig.filename);
  // Apply default transport label.
  fileConfig.label = process.pid.toString();

  // Make path to log file.
  makePathSync(fileConfig.filename);

  transports.push(new winston.transports.DailyRotateFile(fileConfig));

}

// Add console based logger transport.
if (logConfig.console) {

  // Apply default transport label.
  logConfig.console.label = process.pid.toString();
  transports.push(new winston.transports.Console(logConfig.console));

}

// Create a new logger instance.
logger = new winston.Logger({
  transports: transports
});
logger.level = logConfig.level || 'debug';

export { logger };
