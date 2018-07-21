const { createLogger, format, transports } = require('winston');
const config = require('../config/config.js');

const logger = createLogger({
  level: config.logging.level,
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
