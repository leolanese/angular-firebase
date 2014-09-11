describe("A suite", function() {

     it("spec with an expectation", function() {
         expect(true).toBe(true);
    });



    it("says hello", function() {
        expect(hellotdd()).toEqual("Hello tdd");
    });

    it("says tdd", function() {
        expect(hellotdd()).toContain("tdd");
    });

});
