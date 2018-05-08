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
