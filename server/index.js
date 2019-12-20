const chalk = require('chalk');
const startServer = require('./express.js');
const { db, utils } = require('./db/index.js');

const { seed } = utils;

if (process.env.NODE_ENV === 'production') {
  db.sync()
    .then(startServer)
    .then(() => {
      console.log(chalk.greenBright('Application successfully started in production.'));
    })
    .catch(e => {
      console.log(chalk.redBright('Application failed to start in production.'));
      console.error(e);
      process.exit(1);
    });
} else {
  db.sync({ force: true })
    .then(seed)
    .then(startServer)
    .then(() => {
      console.log(chalk.greenBright('Application successfully started in development.'));
    })
    .catch(e => {
      console.log(chalk.redBright('Application failed to start in development.'));
      console.error(e);
    });
}
