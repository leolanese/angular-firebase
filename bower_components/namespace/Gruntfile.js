module.exports = function(grunt) {

    grunt.initConfig({

        clean: ["namespace.min.js", "namespace.min.map", "namespace.js.gz"],

        compress: {
            release: {
                files: {
                    "namespace.js.gz": "namespace.min.js"
                }
            }
        },

        copy: {
            release: {
                src: 'namespace.js',
                dest: 'namespace.min.js'
            }
        },

        jshint: {
            files: ["namespace.js", "test.js"]
        },

        strip_code: {
            options: {
                start_comment: "test-hook",
                end_comment: "end-test-hook"
            },
            release: {
                // a list of files you want to strip code from
                src: "namespace.min.js"
            }
        },

        testem: {
            dev: {
                options: {
                    parallel: 5,
                    launch_in_dev: ["Safari", "IE", "Chrome", "Firefox"],
                    launch_in_ci: ["Safari", "IE", "Chrome", "Firefox"],
                    framework: "mocha"
                },
                src: [
                    "node_modules/chai/chai.js",
                    "node_modules/sinon-chai/lib/sinon-chai.js",
                    "node_modules/sinon/pkg/sinon.js",
                    "namespace.js",
                    "test.js"
                ]
            },
            headless: {
                options: {
                    launch_in_ci: ["PhantomJS"],
                    framework: "mocha"
                },
                src: [
                    "node_modules/chai/chai.js",
                    "node_modules/sinon-chai/lib/sinon-chai.js",
                    "node_modules/sinon/pkg/sinon.js",
                    "namespace.js",
                    "test.js"
                ]
            }
        },

        uglify: {
            release: {
                options: {
                    sourceMap: "namespace.min.map"
                },
                files: {
                    "namespace.min.js": ["namespace.min.js"]
                }
            }
        }
    });

    // Grunt contribution tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-testem");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-strip-code');

    grunt.registerTask("release", [
        "clean", "jshint", "testem:ci:headless", "copy", "strip_code", "uglify", "compress"
    ]);

    // When running the default Grunt command, just lint the code.
    grunt.registerTask("default", ["jshint"]);
};