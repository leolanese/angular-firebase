describe('My App Tests', function () {

    describe('when adding numbers', function () {

        it('should add the two numbers', function () {
            var result  = MyApp.addNumbers(5, 10);
            expect(result).toEqual(15);
        });
    });

    describe('when displaying a person', function () {

        it('should retrieve the person', function () {
            spyOn($, 'getJSON');

            var personId = 354;
            MyApp.displayPerson(personId);

            expect($.getJSON).toHaveBeenCalledWith('/People/' + personId, null, jasmine.any(Function));
        });

        it('should render the results', function () {
            var json = 'some data';

            spyOn(MyApp, 'renderPerson');
            spyOn($, 'getJSON').andCallFake(function (url, data, callback) { callback(json); });

            var personId = 354;
            MyApp.displayPerson(personId);

            expect(MyApp.renderPerson).toHaveBeenCalledWith(json);
        });
    });

    describe('when rendering the person', function () {

        beforeEach(function () {
            setFixtures("<div><span id='firstname'/><span id='surname'/></div>");

            var data = { "Person": { "Firstname": "fred", "Surname": "blogs" } };
            MyApp.renderPerson(data);
        });

        it('should display the firstname', function () {
            expect($('#firstname').text()).toEqual('fred');
        });

        it('should display the surname', function () {
            expect($('#surname').text()).toEqual('blogs');
        });
    });
});