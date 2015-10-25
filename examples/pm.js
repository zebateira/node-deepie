'use strict';

var chalk  = require('chalk');
var deepie = require('..');

deepie = deepie({
    component: { logger: chalk.gray.bgBlack, name: 'pm' },
    loggers: {
        info:   chalk.cyan.bind(null, '›'),
        done:   chalk.green.bind(null, '✓'),
        debug:  chalk.yellow.bind(null, '»'),
    }
});

// Install module

deepie.info('installing module chalk...');

var installDeepie = deepie.child({
    component: { logger: chalk.magenta.bgBlack, name: 'install' },
    separator: { logger: chalk.gray.bgBlack, value: '›' },
});

installDeepie.debug('chalk: will install version 1.0.1...');

// Download module inside install module

var downloadDeepie = installDeepie.child({
    component: { logger: chalk.blue.bgBlack, name: 'download' },
    separator: { logger: chalk.magenta.bgBlack, value: '›' },
});

downloadDeepie.debug('chalk: downloading from repo...');
downloadDeepie.debug('chalk: download done.');

// back to install module

installDeepie.debug('chalk: installing package...');
deepie.done('chalk: installation done!');
