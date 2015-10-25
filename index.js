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

function renderComponent(component) {
    return component.padding ? component.logger(' ' + component.name + ' ') : component.logger(component.name);
}

function renderSeparator(separator) {
    return separator.logger(separator.value);
}

// --------------------------------------------------------

function Deepie(options) {
    options = mixIn({
        loggers: {},
        separator: ' ',
        endSeparator: ' ',
        depth: Infinity
    }, options);

    if (typeof options.component === 'string') {
        options.component = { logger: function (c) { return c; }, name: options.component, padding: false };
    }

    if (typeof options.separator === 'string') {
        options.separator = { logger: function (s) { return s; }, value: options.separator };
    }

    options.component = mixIn({ padding: true, logger: function (c) { return c; } }, options.component);
    options.separator = mixIn({ logger: function (c) { return c; } }, options.separator);

    this._depth     = this._depth ? this._depth + 1 : 1;
    this._config    = options;
    this._component = renderComponent(this._config.component) + (this._depth === 1 ? '' : renderSeparator(this._config.separator));

    for(var logger in this._config.loggers) {
        this[logger] = this._log.bind(this, this._config.loggers[logger]);
        this[logger].stream = streamLog.bind(null, this._config.loggers[logger]);
    }
}

Deepie.prototype.child = function (options) {
    var child;

    options.separator = options.separator || this._config.separator;

    if (typeof options.component === 'string') {
        options.component = merge(this._config.component, { name: options.component });
    }

    if (typeof options.separator === 'string') {
        options.separator = merge(this._config.separator, { value: options.separator });
    }

    options = merge(this._config, options);

    child = new Deepie(options);

    child._depth = this._depth + 1;
    child._component = this._component + (renderSeparator(options.separator) || renderSeparator(options.separator)) + renderComponent(options.component);

    return child;
};

// --------------------------------------------------------

Deepie.prototype._log = function (logger) {
    var args;

    args = Array.prototype.slice.call(arguments);
    args.splice(0, 1);

    this._depth <= this._config.depth &&
        console.log(this._component + this._config.endSeparator + logger(args.join(' ')));
};

// --------------------------------------------------------

module.exports = function (options) {
    return new Deepie(options);
};
