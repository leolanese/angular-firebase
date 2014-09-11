## Angular-base (inspired by angular-seed)

# Getting Started
To get you started you can simply clone the angular-base repository and install the dependencies:

# Clone angular-base
Clone the angular-base repository using:

```
git clone origin https://github.com/sirwilliam/angular-base.git
cd angular-base
```

# Install Dependencies
We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have pre-configured `npm` to automatically run `bower` so we can simply do (package.json):

```
npm install
```

# Verify install
```
node -v;
npm -v;
git --version;
node --version;
bower -v;
karma --version;
grunt -version;
sass -v;
phantomjs --version;
casperjs --version;
bower version;
```

You should find that you have a new folders in your project.

* `node_modules` - contains the npm packages for the tools we need npm run test-single-run


# Run the Application
I have pre-configured the project with a simple development web server.
- node scripts/web-server.js
- run http://localhost:8888/angular-base/app/index.html


# How to run the unit-test:

* the configuration is found at `/karma.conf.js`
* the unit tests are found in `tests/`.

- node scripts/web-server.js
- sudo karma start karma.conf.js --log-level=debug


I also included the Grunt-karma tasks:
grunt karma


You can also ask Karma to do a single run of the tests and then exit.
- npm run test-single-run



# Skills  I have used (the usual suspects):
    ├── javascript
    ├── HTML5
    └── CSS3

# Progressive enhancement path
    ├── using <html> father with: no-js, lt-ie9, lt-ie8, lt-ie7 and no-svg
    ├── selectivizr.js polyfill
    ├── html5shiv.js polyfill
    ├── respond.js
    ├── feature detection framework modernizr.js
    └── including fallbacks for legacy browsers and all vendor using compass mixins

# Tools I have used:
# AngularJS
    ├── filters
    ├── services
    ├── directives
    ├── controllers
    └── angularRoute

# node.js
    ├── grunt
    ├── compass
    ├── jshint
    ├── requirejs
    ├── sass
    ├── watch
    └── ngmin

# Grunt.js
    "karma-script-launcher": "~0.1.0",
    "karma-chrome-launcher": "^0.1.3",
    "karma-firefox-launcher": "~0.1.0",
    "karma-html2js-preprocessor": "~0.1.0",
    "karma-jasmine": "^0.1.5",
    "karma-requirejs": "^0.2.1",
    "karma-coffee-preprocessor": "~0.1.0",
    "karma-phantomjs-launcher": "~0.1.0",
    "karma": "^0.12.14",
    "karma-ng-scenario": "~0.1.0",
    "grunt": "^0.4.4",
    "grunt-contrib-watch": "^0.6.1",
    "grunt-contrib-compass": "^0.7.2",
    "grunt-contrib-jshint": "^0.10.0",
    "grunt-contrib-sass": "^0.7.3",
    "grunt-contrib-requirejs": "^0.4.3",
    "grunt-contrib-csslint": "^0.2.0",
    "grunt-contrib-uglify": "^0.4.0",
    "karma-safari-launcher": "^0.1.1",
    "requirejs": "^2.1.11",
    "grunt-karma": "^0.8.3",
    "grunt-contrib-jasmine": "^0.5.3",
    "grunt-template-jasmine-requirejs": "^0.1.10",
    "grunt-ngmin": "0.0.3"
    "grunt-modernizr": "^0.5.2",
    └──
        Enabled Extras
        └──  shiv
        └──  load
        └──  mq
        └──  cssclasses
        └──  fontface
        └──  Generating a custom Modernizr build: modernizr-custom.js
        └──  Uglifying


# Bower.js
    ├─┬ angular-mocks#1.2.16 extraneous (1.2.17-build.223+sha.d18d5f5 available, latest is 1.3.0-build.2792+sha.0dc35ef)
    │ └── angular#1.2.16 (latest is 1.3.0-build.2792+sha.0dc35ef)
    ├─┬ angular-route#1.2.16 extraneous (1.2.17-build.223+sha.d18d5f5 available, latest is 1.3.0-build.2792+sha.0dc35ef)
    │ └── angular#1.2.16
    ├─┬ angular-scenario#1.2.16 extraneous (1.2.17-build.223+sha.d18d5f5 available, latest is 1.3.0-build.2792+sha.0dc35ef)
    │ └── angular#1.2.16
    ├─┬ bootstrap#3.1.1 extraneous
    │ └── jquery#1.10.2 (2.1.1 available)
    ├── bootstrap-sass-official#3.1.1+2 extraneous
    ├── happen#0.1.3 extraneous
    ├── jasmine#1.3.1 extraneous (latest is 2.0.0)
    ├─┬ jasmine-sinon#0.3.1 (0.3.2 available, latest is 0.4.0)
    │ ├── jasmine#1.3.1 (latest is 2.0.0)
    │ └── sinonjs#1.7.3 (latest is 1.9.1)
    ├── jquery#1.10.2 (latest is 2.1.1)
    ├── modernizr#2.6.3 (latest is 2.8.2)
    ├── namespace#0.5.3 extraneous
    ├── normalize-css#3.0.1 extraneous
    ├── requirejs#2.1.11 extraneous (2.1.13 available)
    ├── requirejs-text#2.0.12 extraneous
    └── selectivizr#1.0.2 extraneous

# Automatic Test
    ├──Jasmine (Behavior Driven Development testing framework: or http://searls.github.io/jasmine-all/jasmine-all-min.js)
    └──karma (Test Driver)
        ├──safari pluggin karma-safari-launcher
        └──ios pluggin karma-ios-launcher


# Lay-out test:
<pre>
    cd tests/casper
    casperjs go.js http://www.bostonglobe.com/
</pre>

# Parts of the tests:
    ├── lib _ jasmine Framework
    ├── spec _ unit-test
    ├── src_ Code to be tested
    └── SpecRunner.html - Runner

# Libraries:
    └── rwd-reset.css (https://github.com/sirwilliam/rwd-reset)

# IDE
    └── WebStorm

# RequireJS conf file:
    └── main.js

# AngularJS conf file:
    └── app.js

--------

# Problems on push:
<pre>
    git rm --cache -r -f .sass-cache/
    git rm --cache -r -f .idea/
</pre>


# Thanks:
<pre>
Inspired by the angular-seed project (Seed project for angular apps.):
https://github.com/angular/angular-seed
</pre>


## Leo Lanese, I build websites, London, UK<br>


# My Portfolio<br>
<a href="http://www.leolanese.com" target="_blank">http://www.leolanese.com</a><br>

# My LAB<br>
<a href="http://www.rwdlab.com" target="_blank">http://www.rwdlab.com</a><br>

# My Activities:<br>
<a href="www.beresponsive.co.uk" target="_blank">www.beresponsive.co.uk</a><br>

# My Blog:<br>
<a href="www.leolanese.com/blog" target="_blank">www.leolanese.com/blog</a><br>

# Twitter:<br>
<a href="http://twitter.com/LeoLaneseltd" target="_blank">http://twitter.com/LeoLaneseltd</a><br>

# Questions / Suggestion?<br>
<a href="mail:to">javscript@leolanese.com</a><br>