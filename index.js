const config = require('./src/config/config.js');
const app = require('./src/config/express.js');
const logger = require('./src/utils/logger.js');

app.listen(config.port, () => {
  logger.info(`server started on port ${config.port} (${config.env})`);
});

process.on('uncaughtexception', (err) => {
  logger.error(`uncaughtexception: ${err}`);
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => { // eslint-disable-line no-unused-vars
  logger.error(`unhandledRejection: ${reason}`);
  process.exit(0);
});
