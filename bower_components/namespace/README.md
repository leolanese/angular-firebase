    ,--,--,  ,--,--.,--,--,--. ,---.  ,---.  ,---.  ,--,--. ,---. ,---.
    |      \' ,-.  ||        || .-. :(  .-' | .-. |' ,-.  || .--'| .-. :
    |  ||  |\ '-'  ||  |  |  |\   --..-'  `)| '-' '\ '-'  |\ `--.\   --.
    `--''--' `--`--'`--`--`--' `----'`----' |  |-'  `--`--' `---' `----'
                                            `--'

[![Build Status](https://travis-ci.org/abalanga/namespace.png?branch=master)](https://travis-ci.org/abalanga/namespace/)

namespace.js is a library for JavaScript that provides support for creating and accessing namespaces
across multiple files.

## Getting started

You can checkout the library from git or use bower:

```shell
bower install namespace --save
```
The library is AMD compatible so you can load it with require or import it into your HTML:

```html
<script src='namespace.js' type='text/javascript></script>
```

## Api

```js
   /**
     * Represents a namespace.
     * @param options properties for this namespace
     * @constructor
     */
     namespace (options)
```

```js
   /**
     * Find or create a module in the namespace.
     * @param namespace the name and path of the module
     * @param options any default properties for the module (if created)
     * @returns {Object} the module in question
     */
     namespace.prototype.import (namespace, options)
```

```js
  /**
    * Register an Object or native value into a module in the namespace.
    * @param module identifier for space
    * @param obj item to register
    * @returns {*} the item registered
    */
    namespace.prototype.register (module, obj)

```


## How to use

### In plain JavaScript:

```js
var ns = new namespace();
var myApp = ns.import('myApp');
ns.register('myApp.util.alert': function() { window.alert(arguments); });
ns.register('myApp.util.log': function() { console.log(arguments); });
myApp.util.alert('alert test');
myApp.util.log('log test');
```

**or**

```js
var ns = new namespace();
var myApp = ns.import('myApp');
ns.register('myApp.util': {
    alert: function() { window.alert(arguments); },
    log: function() { console.log(arguments); }
});
myApp.util.alert('alert test');
myApp.util.log('log test');
```

### In requireJS:

**main.js**
```js
require(['app', 'alert', 'echo'], function () {
    var myApp = app.import('myApp');
    myApp.util.alert('alert test');
    myApp.util.log('log test');
});
```

**app.js**
```js
define(['namespace'], function () {
    var app = new namespace();
    return app;
});
```

**alert.js**
```js
define(['app'], function (app) {
    function alert () { window.alert(arguments); }
    app.register('myApp.util.alert', alert);
    return alert;
});
```

**log.js**
```js
define(['app'], function (app) {
    function log () { console.log(arguments); }
    app.register('myApp.util.log', log);
    return log;
});
```

## How to build

```shell
npm install -g testem
npm install -g phantomjs
npm install
grunt release
```

## How to test

```shell
npm install -g testem
npm install
testem
```

## License

The MIT License (MIT)

Copyright (c) 2013 Adam Balanga

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


It can be found here: https://github.com/abalanga/namespace