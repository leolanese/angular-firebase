describe("getTweets", function () {
    var callback;

    var the = {
        path: "old title"
    };


    beforeEach(function () {
        suiteWideFoo = 1;

        var xhr = sinon.useFakeXMLHttpRequest();
        var requests = sinon.requests = [];

        xhr.onCreate = function (request) {
            requests.push(request);
        };

        var callback = sinon.spy();

        $.ajax('/some/article', { success: callback });
    });


    it('spy callback', function(){

        expect(callback).toHaveBeenCalled;

    });


    it('spy request lenght', function(){

       expect(sinon.requests.length).toBe(1);

    });


    it('spy requests', function(){

       expect(sinon.requests[0].url, the.path);

    })


});