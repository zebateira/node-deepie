# deepie

> A simple logger with depth.

Deepie makes it easier to add depth to your cli logging when you want more visual structure.

## Installation

`$ npm install deepie --save`

## API

### `deepie(options)`

Creates a new deepie instance.

Available options:

 - `component`: component's name
 - `separator`: string used to separate this component block with the previous one (defaults to the previous separator or a single space if none so far)
 - `endSeparator`: string used to separate the components block and the text to be logged
 - `loggers`: object with log functions
 - `depth`: maximum depth to be logged

 Example:

 ```js
 var logger = deepie({
     component: 'loader',
     loggers: { error: chalk.red }
 });
 ```

### `deepie.child(options)`

Creates a new deepie child component overriding the parents options.

Example: `deepie.child({ component: '[loader]' })`

### `deepie.<logger>(string, [string...])`

Logs to `process.stdout` the provided arguments (separated by spaces) using the previously configured logger.

Example:

```js
var logger = deepie({
    component: '[loader]',
    loggers: { error: chalk.red }
});

logger.error('Error: failed to load!');
// [loader] Error: failed to load!
```

### `deepie.<logger>.stream()`
Example: `fs.createReadStream('.editorconfig').pipe(deepie.stdout.stream()).pipe(process.stdout);`


Returns a transform stream that will stream the buffer after applying the logger function on it.

## Examples

Go crazy with some colors:

```js
var chalk  = require('chalk');
var deepie = require('deepie');

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

```

_Outputs_

![Result of pm example](http://i.imgur.com/1RBF8CT.png)

You can limit the amount of depth to be logged:

```js
var deepie = require('deepie');

deepie = deepie({
    // ...
    depth: 1
});
```

_Outputs_

![Result of pm example](http://i.imgur.com/i0Ljt9l.png)

## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
