module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        // Metadata.
        meta: {
            basePath: '../',
            srcPath: '../src/',
            deployPath: '../deploy/',
            root: '/Users/Leo/Documents/root/angular-base',
            www: '/Users/Leo/Documents/root/angular-base/www',
            jasmine: '<%= meta.root  %>/tests/'


        },

        /* node webserver using express */
        express: {
            options: {
                // Override defaults here
            },
            web: {
                options: {
                    script: '<%= meta.root  %>/scripts/server.js'
                }
            }

        },


        // Compiles SASS (with Compass) into CSS.
        compass: {                  // Task

            dist: {                   // Target

                options: {              // Target options
                    sassDir: 'sass',
                    cssDir: 'css',

                    environment: 'production',
                    outputStyle: 'compact'
                },
                files: {
                    '<%= meta.root  %>/app/css/main.css' : '<%= meta.root  %>/scss/main.scss'
                }
            }

        },

        // Compiles SASS into CSS.
        // generates the source-map
        sass: {

            dist: {  // Target
                options: {
                    style: 'expanded',
                    debugInfo: false,
                    sourcemap: false
                },
                files: {

                     '<%= meta.root  %>/app/css/main.css' : '<%= meta.root  %>/scss/main.scss',
                     '<%= meta.root  %>/app/css/bs.css' : '<%= meta.root  %>/bower_components/bootstrap-sass-official/vendor/assets/stylesheets/bootstrap.scss'
                }
            }
        },

        // Lints compiled CSS files for errors or bad practice: https://github.com/CSSLint/csslint/wiki/Rules
        csslint: {
            options: {
                'adjoining-classes': false,
                'box-model': true,
                'box-sizing': false,
                'bulletproof-font-face': 2,
                'display-property-grouping': true,
                'duplicate-background-images': true,
                'duplicate-properties': true,
                'empty-rules': 2,
                'fallback-colors': true,
                'import': 2,
                'important': true,
                'known-properties': 2,
                'overqualified-elements': true,
                'unqualified-attributes': 2,
                'underscore-property-hack': 2
            },
            src: ['app/css/*.css']
        },

        // Concatenates and minifys the following tasks.
        uglify: {

            options: {
                banner: '',
                beautify: true,
                preserveComments: false
            },
            dist: {
                src: [
                    /*
                    'js/libs/handlebars.js',
                     'js/libs/swfobject.js',
                     'js/src/Player.js',
                     */
                    'app/js/src/main.js'
                ],
                dest: 'app/js/build.min.js'
            }
        },


        requirejs: {
            compile: {
                options: {
                    baseUrl: "path/to/base",
                    mainConfigFile: "path/to/config.js",
                    name: "path/to/almond", // assumes a production build using almond
                    out: "path/to/optimized.js"
                }
            }
        },


        jshint: {
            options: {
                // Specifying JSHint options and globals
                jshintrc: '.jshintrc'
            },
            files: ['Gruntfile.js', './js/lib/*.js']  // libext are not under jshint
        },



        connect: {
            test : {
                port : 8888
            }
        },
        jasmine: {

            simple: {
                src: '<%= meta.jasmine %>/src/**/*.js',
                options: {
                    specs: '<%= meta.jasmine  %>spec/**/*Spec.js',
                    helpers: '<%= meta.jasmine  %>lib/helpers/*.js'
                }
            },

            templateTest: {
                // project's source files
                src: '<%= meta.jasmine %>/src/**/*.js',
                    options: {
                    // Jasmine spec files
                    specs: '<%= meta.jasmine  %>spec/*Spec.js',
                        // spec helper files
                        helpers: '<%= jasmine  %>lib/helpers/*.js',
                        host: 'http://192.168.0.5:8888/',
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfigFile: '<%= meta.root %>/app/js/main.js',
                            requireConfig: {
                                baseUrl: 'overridden/baseUrl'
                            }
                    }
                }
            }
        },


        // The responsive_images task will take your source image and
        // create images at different resolutions for use
        // needs: GraphicsMagick or ImageMagick
        // brew install GraphicsMagick
        // or
        // brew install ImageMagick
        responsive_images: {
            myTask: {
                options: {
                    sizes: [{
                        name: "small",
                        width: 320
                    },{
                        name: 'medium',
                        width: 640
                    },{
                        name: 'large',
                        width: 1024
                    }]
                },


                files: [{
                    expand: true,
                    src: ['<%= meta.root  %>/img/source/**.{jpg,gif,png}'],
                    cwd: '',
                    custom_dest: 'img/size/{%= width %}/'
                }]
            }
        },

        uncss: {
            dist: {
                options: {
                    ignoreSheets : [/fonts.googleapis/]
                },
                files: {
                    // HTML files you would like scanned
                    'css/main.css': ['./index.html']
                }
            }
        },

        ngmin: {
            controllers: {
                src: ['test/src/controllers/one.js'],
                dest: 'test/generated/controllers/one.js'
            },
            directives: {
                expand: true,
                cwd: 'test/src',
                src: ['directives/**/*.js'],
                dest: 'test/generated'
            }
        },

        // problems?
        // ps aux | grep karma
        // kill -9 iD
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        },


        //  grunt-modernizr automatically find references to Modernizr detects in your code
        modernizr: {

            dist: {
                // [REQUIRED] Path to the build you're using for development.
                "devFile" : "<%= meta.root  %>/bower_components/modernizr/modernizr.js",

                // [REQUIRED] Path to save out the built file.
                "outputFile" : "<%= meta.root  %>/bower_components/modernizr/modernizr-custom.js",

                // Based on default settings on http://modernizr.com/download/
                "extra" : {
                    "shiv" : true,
                    "printshiv" : false,
                    "load" : true,
                    "mq" : true,
                    "cssclasses" : true,
                    "fontface" : true
                },

                // Based on default settings on http://modernizr.com/download/
                "extensibility" : {
                    "addtest" : false,
                    "prefixed" : false,
                    "teststyles" : false,
                    "testprops" : false,
                    "testallprops" : false,
                    "hasevents" : false,
                    "prefixes" : false,
                    "domprefixes" : false

                },

                // By default, source is uglified before saving
                "uglify" : true,

                // Define any tests you want to implicitly include.
                "tests" : [],

                // By default, this task will crawl your project for references to Modernizr tests.
                // Set to false to disable.
                "parseFiles" : true,

                // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
                // You can override this by defining a "files" array below.
                // "files" : {
                // "src": []
                // },

                // When parseFiles = true, matchCommunityTests = true will attempt to
                // match user-contributed tests.
                "matchCommunityTests" : false,

                // Have custom Modernizr tests? Add paths to their location here.
                "customTests" : []
            }

        },


        // watching tasks
        watch: {

            files: [
                '<%= meta.root  %>/app/js/**/*.js',
                '<%= meta.root  %>/scss/**/*.scss',
                '<%= meta.root  %>/app/partials/**/*.scss',
                '<%= meta.root  %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
            ],

            /* testing livereload */
            frontend: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= meta.root  %>/app/js/**/*.js',
                    '<%= meta.root  %>/scss/**/*.scss',
                    '<%= meta.root  %>/app/partials/**/*.scss',
                    '<%= meta.root  %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },


            connect: {
                options: {
                    spawn: false,
                    port: 9000,
                    livereload: 35728,
                    // change this to '0.0.0.0' to access the server from outside
                    hostname: "127.0.0.1"
                },
                livereload: {
                    options: {
                        open: {
                            target: 'http://localhost:9000/'
                        },
                        base: [
                            '<%= meta.root  %>'
                        ]
                    }
                },
                files: [
                    '<%= meta.root  %>/app/js/**/*.js',
                    '<%= meta.root  %>/scss/**/*.scss',
                    '<%= meta.root  %>/app/partials/**/*.scss',
                    '<%= meta.root  %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },

            // run unit tests with karma (server needs to be already running)
            karma: {
                files: ['app/js/**/*.js', 'test/browser/**/*.js'],
                tasks: ['karma:unit'] //NOTE the :run flag
            },


            // Watch for sass changes, building CSS directly
            css: {
                // Which files to watch (all .scss files recursively in the scss directory)
                files: [
                        '<%= meta.root  %>/scss/*.scss'
                       ],
                tasks: ['sass:dist'],
                options: {
                    nospawn: true
                }
            },

            // Watch for JS changes, linting the JS and copying direct to deployment directory.
            scripts: {
                files: ['Gruntfile.js', 'server.js', '<%= meta.root  %>/js/lib/*.js', '<%= meta.www  %>/tests/**/*.js'],
                tasks: ['jshint', 'uglify:dist'],
                options: {
                    //spawn: false,
                    livereload: true
                }
            },

            // Watch for SASS changes, building CSS directly into deployment directory.
            sass: {
                files: ['<%= meta.root %>/scss/**/*.scss'],
                tasks: ['compass:dist']
            }
        }



    });

    // // Register tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.loadNpmTasks('grunt-ngmin'); // add the [] for production uglify
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks("grunt-modernizr");

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-contrib-connect');




    // Task definitions: put the tasks on a factory
    grunt.registerTask('default', [
        'watch',  'jshint', 'compass', 'csslint', 'uglify', 'requirejs' ]);

    grunt.registerTask('test', [
        'karma', 'uglify'
    ]);

    grunt.registerTask('serve', [
        'connect', 'watch'
    ]);

};
