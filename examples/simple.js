'use strict';

var deepie = require('..');

deepie = deepie({
    separator: { value: ' > ' },
    component: { name: '[loader]', padding: false },
    loggers: { log: function (a) { return a; } }
});

deepie.child({ component: '[status]' }).child({ component: '[more]' }).log('loading...');
