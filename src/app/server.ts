/**
 * Author - gmahto@avst.com
 */

import express from 'express';

import { triggerCIBuild } from 'triggers/ci';
import { logger } from 'utils/logger';

export const app: express.Express = express();

export function listener(err: NodeJS.ErrnoException) {

  if (err) {
    logger.error('Unable to start server.', err);
  } else {
    logger.info('Server is now listening.');
  }

}

// Register default route.
app.get('/processP4Trigger/:user/:changeList', (req, res) => {

  const user = req.params.user;
  const changeList = req.params.changeList;

  triggerCIBuild({ user, changeList });

  res.status(200)
    .end();

});
