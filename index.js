'use strict';

var stream = require('stream');
var merge  = require('mout/object/merge');
var mixIn  = require('mout/object/mixIn');

function streamLog(style) {
    var styledStream = new stream.Transform();

    styledStream._transform = function (chunk, encoding, callback) {
        callback(null, style(chunk));
    };

    return styledStream;
}

function log(component, separator, logger) {
    var args;

    args = Array.prototype.slice.call(arguments);
    args.splice(0, 3);

    console.log(component + separator + logger(args.join(' ')));
}

// --------------------------------------------------------

function Deepie(options) {
    options = mixIn({
        loggers: {},
        separator: '',
        endSeparator: ' '
    }, options);

    this._config = options;
    this._component = options.component;

    // Set log loggers
    for(var logger in options.loggers) {
        this[logger] = log.bind(null, this._component, this._config.endSeparator, options.loggers[logger]);
        this[logger].stream = streamLog.bind(null, options.loggers[logger]);
    }
}

Deepie.prototype.child = function (options) {
    options = options ||  {};

    if (options.component) {
        options.component = this._component + (options.separator || ' ') + options.component;
    }

    return new Deepie(merge(this._config, options));
};

Deepie.prototype.stream = function (style) {
    var styledStream = new stream.Transform();

    styledStream._transform = function (chunk, encoding, callback) {
        callback(null, style(chunk));
    };

    return styledStream;
};

module.exports = Deepie;
