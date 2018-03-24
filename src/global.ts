/**
 * Author - gmahto@avst.com
 */

// Patch Node's search paths.
// Examples:
// require('libs/my-module-name')
// require('apps/app-name/models/user')
require('app-module-path')  // tslint:disable-line
  .addPath(__dirname);

// Create application globals.
global.APP_ROOT_DIR = __dirname;
