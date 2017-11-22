import { MOCK_API } from './mock';

// Start the server
require('browser-sync')({
  middleware: MOCK_API,
  port: 3030,
  directory: true,
  startPath: 'debug.html',
  open: false,
  //injectChanges: false,,
  // https: {
  //   key: './mock/mockAPI/_ssl/dummy.key',
  //   cert: './mock/mockAPI/_ssl/dummy.crt'
  // },
  server: {
    baseDir: 'mock/dummy',
    routes: {
      ['/node_modules']: 'node_modules',
    }
  }
});