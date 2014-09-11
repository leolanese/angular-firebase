MyApp = {

    addNumbers : function (a, b) {
        var result = a + b;
        return result;
    },

    displayPerson : function(personId) {
        $.getJSON('/People/' + personId, null, MyApp.renderPerson);
    },

    renderPerson : function(data) {
        $('#firstname').text(data.Person.Firstname);
        $('#surname').text(data.Person.Surname);
    }
};