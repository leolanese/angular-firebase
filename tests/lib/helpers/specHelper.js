Namespace.use('jasmine.grammar.GWT.*');

jasmine.getFixtures().fixturesPath = jasmine.SPEC_PATH + 'javascripts/fixtures';

beforeEach(function() {
    this.addMatchers({

        toHaveQueueLength: function(expected) {
            var queue = this.actual._queue;

            this.message = function() {
                return "Expected queue length " + queue.length + " to equal " + expected;
            };

            return queue.length === expected;
        },

        toBeInstanceOf: function(expected) {
            return this.actual instanceof expected;
        },

        toBeNowTvSearch: function(expectedId) {
            var actual = this.actual;

            this.message = function() {
                return 'Expected dom element with id: [' + actual.id + '], to be dom element with id: [' + expectedId + ']';
            };

            return actual === document.getElementById(expectedId);
        },

        toHaveValidPin: function() {
            return this.actual.validatePin() === true;
        },

        toHaveWidth: function(expected) {

            var outerWidth = this.actual.outerWidth();

            this.message = function() {
                return 'Expected ' + expected + 'px to equal ' + outerWidth + 'px';
            };

            return outerWidth === expected;
        }
    });
});