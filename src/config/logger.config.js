const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('winston-daily-rotate-file');


// DailyRotateFile
/* eslint-disable no-undef */
const fileRotateTransport = new transports.DailyRotateFile({
  level: 'error',
  filename: `${__dirname}/../logs/error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '2d',
  maxSize: '20m'
});

// custom format
const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console(),
    fileRotateTransport,
  ],
  format: combine(
    timestamp(),
    customFormat
  ),
});



module.exports = logger;