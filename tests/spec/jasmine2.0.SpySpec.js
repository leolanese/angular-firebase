// Jasmine allows you to do this with: runs(), waits() and waitsFor() THOSE ALL deprecated on Jasmine 2.0

describe("Asynchronous specs", function() {
    var value;

    // Calls to 'beforeEach', 'it', and 'afterEach' can take an optional single argument that should be called
    // when the async work is complete: done
    beforeEach(function(done) {
        setTimeout(function() {
            value = 0;
            done(); //  this spec will not complete until its done is called
        }, 1);
    });


    // This Spec will not start until the done function is called in the beforeEach()
    it("should support async execution of test preparation and expectations", function(done) {
        value++;
        expect(value).toBeGreaterThan(0);
        done();
    });


    describe("long asynchronous specs", function() {
        var originalTimeout;

        // By default jasmine will wait for 5 seconds for an asynchronous spec to finish before causing at timeout failure
        beforeEach(function() {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 7000;
        });

        it("takes a long time than DEFAULT_TIMEOUT_INTERVAL = 5000 ", function(done) {
            setTimeout(function() {
                done();
            }, 6000);
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });


});