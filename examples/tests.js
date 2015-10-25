'use strict';

var chalk  = require('chalk');
var deepie = require('..');

var logger = deepie({
    component: { logger: chalk.blue.bgBlack, name: 'mycli' },
    endSeparator: chalk.black(' '),
    loggers: {
        log:    chalk.cyan,
        info:   chalk.cyan.bind(null, '›'),
        done:   chalk.green.bind(null, '✓'),
        warn:   chalk.magenta.bind(null, '⚑'),
        debug:  chalk.yellow.bind(null, '»'),
        trace:  chalk.gray.bind(null, '∝'),
        error:  chalk.red.bind(null, '✗'),
        run:    chalk.blue.bind(null, '»'),
        stdout: chalk.gray,
        stderr: chalk.red
    }
});

logger.info('Hey this is an info log');
logger.done('Hey this is a done log');
logger.warn('Hey this is a warn log');
logger.debug('Hey this is a debug log');
logger.trace('Hey this is a trace log');
logger.error('Hey this is an error log');
logger.run('Hey this is a run log');

var test = logger.child({
    component: 'test',
    separator: { logger: chalk.gray.bgBlack, value: '›' },
    loggers: {
        before: chalk.black.bgWhite,
        error: chalk.white.bgMagenta
    }
});

test.before('Before tests, setup something');
test.info('Hey this is an info log with a component');
test.done('Hey this is a done log with a component');
test.warn('Hey this is a warn log with a component');
test.debug('Hey this is a debug log with a component');
test.trace('Hey this is a trace log with a component');
test.error('Hey this is an error log with a component');

logger.log('Before tests, setup something');

var depth = test.child({
    component: 'depth',
    separator: '~'
});

depth.info('Depth 3');

logger.debug('reading editorconfig file');
require('fs').createReadStream('.editorconfig')
    .pipe(logger.stdout.stream())
    .pipe(process.stdout);

var loader = deepie({
    component: '[loader]',
    loggers: { error: chalk.red }
});

loader.error('Error: failed to load!');
