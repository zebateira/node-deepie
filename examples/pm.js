'use strict';

var chalk  = require('chalk');
var deepie = require('..');

deepie = deepie({
    component: chalk.gray.bgBlack(' pm '),
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

// Install module

deepie.info('installing module chalk...');

var installDeepie = deepie.child({
    component: chalk.magenta.bgBlack(' install '),
    separator: chalk.gray.bgBlack('›')
});

installDeepie.debug('chalk: will install version 1.0.1...');

// Download module inside install module

var downloadDeepie = installDeepie.child({
    component: chalk.blue.bgBlack(' download '),
    separator: chalk.gray.bgBlack('›')
});

downloadDeepie.debug('chalk: downloading from repo...');
downloadDeepie.debug('chalk: download done.');

// back to install module

installDeepie.debug('chalk: installing package...');

deepie.done('chalk: instalation done!');
