/*

Replaces console.log and allows for more customization of the log.

To use, call this file into any .js file and call 'logger.info('text') or logger.error('text')'

*/

import logger from 'pino';

const log = logger({
    base: {pid: false},
    transport: {
        target: 'pino-pretty',
        options: {
            colorized: true
        }
    },
    timeStamp: () => `,"time": "${new Date().toLocaleString()}"`
});

export default log;