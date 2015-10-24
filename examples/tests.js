'use strict';

var chalk  = require('chalk');
var deepie = require('..');

deepie = deepie({
    component: chalk.gray.bgBlack(' mycli '),
    endSeparator: chalk.black(' '),
    loggers: {
        hey:    chalk.blue,
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

deepie.info('Hey this is an info log');
deepie.done('Hey this is a done log');
deepie.warn('Hey this is a warn log');
deepie.debug('Hey this is a debug log');
deepie.trace('Hey this is a trace log');
deepie.error('Hey this is an error log');
deepie.run('Hey this is a run log');

var test = deepie.child({
    component: chalk.blue.bgBlack(' test '),
    separator: chalk.gray.bgBlack('›'),
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

deepie.log('Before tests, setup something');

var depth = test.child({
    component: chalk.magenta.bgBlack(' depth '),
    separator: chalk.gray.bgBlack('~')
});

depth.info('Depth 3');

deepie.debug('reading editorconfig file');
require('fs').createReadStream('.editorconfig')
    .pipe(deepie.stdout.stream())
    .pipe(process.stdout);
