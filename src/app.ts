/**
 * Description - Entry point.
 * Author - gmahto@avst.com
 */

import './global';

import { app, listener } from 'app/server';

const port = 80;

app.listen(port, listener);
