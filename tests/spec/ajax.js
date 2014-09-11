describe("ajax jasmine test", function() {


    it("can perform a successful ajax request on resource ajax.html", function() {
      var asyncCallComplete, result,
          _this = this;
      
      // asyncCallComplete is set to true when the ajax call is complete
      asyncCallComplete = false;

      // result stores the result of the successful ajax call
      result = null;

      // SECTION 1 - call asynchronous function
      // use: http://localhost:8888/TDD/jasmine/SpecRunner.Ajax.html
      runs(function() {
        return $.ajax('/TDD/jasmine/ajax/ajax.html', {
          type: 'GET',
          success: function(data) {
            asyncCallComplete = true;
            result = data;
          },
          error: function() {
            asyncCallComplete = true;
          }
        });
      });

      // SECTION 2 - wait for the asynchronous call to complete
      waitsFor(function() {
        return asyncCallComplete !== false;
      });

      // SECTION 3 - perform tests
      return runs(function() {
        return expect(result).not.toBeNull();
      });
    });
      
});