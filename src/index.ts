import http from 'http';
import createDebug from 'debug';
import { app } from './app.js';
import { config } from './config.js';

const debug = createDebug('SERVER');
const port = config.port || 6100;
const server = http.createServer(app);

// const connection = dbConnection()
//   .then(() => {
//     server.listen(port);
//     debug('server-initiated');
//   })
//   .catch((error) => {
//     server.emit('error', error);
//   });

// app.use(dbConnection);
debug('server-initiated');
server.listen(port);

server.on('error', (error) => {
  debug('Server error', error.message);
});

server.on('listening', () => {
  debug('Listening http://localhost:' + port);
});
