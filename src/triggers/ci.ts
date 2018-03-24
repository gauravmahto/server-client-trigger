/**
 * Author - gmahto@avst.com
 */

import { request } from 'http';

import { logger } from 'utils/logger';

export function triggerCIBuild({ user = 'N/A', changeList = 'N/A' } = {}): void {

  logger.info(`#triggerCIBuild - Provided options - user:${user}, changeList:${changeList}.`);

  const req = request({
    host: '192.168.127.135',
    port: 8080,
    method: 'GET',
    path: `/job/NodeJS/buildWithParameters?token=buildNodeJS&cause=TriggeredBy${user}&P4_CHANGELIST=${changeList}`
  });

  req.on('error', (err: any) => {
    logger.error(err);
  });

  req.end();

}
