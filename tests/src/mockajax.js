describe("ajax mocking test:", function() {


    it("mock it is defined and intercepting the request", function() {

        expect($.mockjax).toBeDefined();
    });

    it("Can perform a  ajax request", function() {

        expect($.getJSON).toBeDefined();

    });

    it("Can perform a successful ajax request", function() {

        expect($.getJSON().readyState).toBe(1);

    });

});