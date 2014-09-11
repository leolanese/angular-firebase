describe('Hello tdd', function() {

	describe("Hello tdd", function() {
	    it("says hello", function() {
	        expect(helloTdd()).toEqual("Hello tdd!");
	    });
	});	

	describe("Hello tdd", function() {
	    it("says world", function() {
	        expect(helloTdd()).toContain("tdd");
	    });
	});

});