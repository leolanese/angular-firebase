// Jasmine allows you to do this with: runs(), waits() and waitsFor() THOSE ALL deprecated on Jasmine 2.0


describe("Asynchronous specs", function() {
    var value, flag;

    it("async test", function() {


        runs(function() {
            flag = false;
            value = 0;
            ajaxFoo(value, function(x) {
                value = x;
                flag = true;
            });
        });

        waitsFor(function() {
            return flag;
        }, "Message for timeout case", 750);

        runs(function() {
            expect(value).toBeGreaterThan(0);
        });

    });
});
