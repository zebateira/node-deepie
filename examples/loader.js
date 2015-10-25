'use strict';

var chalk  = require('chalk');
var deepie = require('..');

var logger = deepie({
    component: { logger: chalk.gray.bgBlack, name: 'cli' },
    separator: { logger: chalk.gray.bgBlack, value: '›' },
    loggers: {
        info:   chalk.cyan.bind(null, '›'),
        done:   chalk.green.bind(null, '✓'),
        debug:  chalk.yellow.bind(null, '»'),
    }
});

// Loader module

logger.info('loading service...');

var loadingLogger = logger.child({
    component: { logger: chalk.blue.bgBlack, name: 'loader' }
});

loadingLogger.debug('newsletter: checking for service status...');

// Status checker module

var statusLogger = loadingLogger.child({
    component: { logger: chalk.magenta.bgBlack, name: 'status' }
});

statusLogger.debug('newsletter: service status received');

// back to loader module

loadingLogger.debug('newsletter: service ok.');
logger.done('newsletter: service loaded!');
