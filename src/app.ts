/*
 *    Copyright 2018 Martin Fink
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

'use strict';

// module dependencies
const server = require('./server');
const debug = require('debug')('express:server');
const http = require('http');

// create http server
const httpPort = normalizePort(process.env.PORT || 10000);
let app = server.Server.bootstrap().app;
app.set('port', httpPort);
const httpServer = http.createServer(app);

// noinspection TsLint
console.log(`Server started on port ${httpPort}`);

// listen on provided ports
httpServer.listen(httpPort);

// add error handler
httpServer.on('error', onError);

// start listening on port
httpServer.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('Port requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('Port is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = httpServer.address();
    debug(`Listening on port ${addr.port}`);
}
