/**
 * Author - gmahto@avst.com
 */

import '../global';

import { request } from 'http';
import process from 'process';

import { getArgKeyVal } from 'utils/utils';

export function makeTriggerRequest({ user = '_', changeList = '_',
  server = '10.2.5.180', port = 80 } = {}): void {

  const req = request({
    host: server,
    port: port,
    method: 'GET',
    path: `/processP4Trigger/${user}/${changeList}`
  });

  req.on('error', (err: any) => {
    console.error(err); // tslint:disable-line
  });

  req.end();

}

const oServer = getArgKeyVal('server', process.argv).val;
const oChangeList = getArgKeyVal('changelist', process.argv).val;
const oUser = getArgKeyVal('user', process.argv).val;
let oPort = Number(getArgKeyVal('port', process.argv).val);

oPort = Number.isNaN(oPort) ? 80 : oPort;

makeTriggerRequest({
  user: oUser || '_',
  server: oServer || '10.2.5.180',
  port: oPort,
  changeList: oChangeList || '_'
});
