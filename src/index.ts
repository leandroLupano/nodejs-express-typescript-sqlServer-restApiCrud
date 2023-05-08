import http from 'http';
import createDebug from 'debug';
import { app } from './app.js';
import { config } from './config.js';

const debug = createDebug('SERVER');
const port = config.port || 6100;
const server = http.createServer(app);

debug('server-initiated');
server.listen(port);

server.on('listening', () => {
  debug('Listening http://localhost:' + port);
});
