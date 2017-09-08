/* eslint-disable no-console */
/* eslint-disable arrow-body-style */

/**
 * Server setup
 */
import express from 'express';
import chalk from 'chalk';

import './config/database';
import middlewaresConfig from './config/middlewares';
import Constants from './config/Constants';
import ApiRoutes from './routes';

const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

// Add the apiRoutes stack to the server
app.use('/api', ApiRoutes);

const isDev = process.env.NODE_ENV === 'development';

const envUrl = () => {
  return isDev
    ? `http://localhost:${Constants.PORT}/api`
    : `http://PRODUCTION_URL:${Constants.PORT}/api`;
};

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(Constants.PORT, err => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
        App listen on port: ${Constants.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
        URL: ${envUrl()} 🍺
        Docs: http://broweatherdocs.danetheory.com/

      `,
        ),
      );
    }
  });
}

export default app;
