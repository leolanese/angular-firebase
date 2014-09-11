function ajaxFoo(value, callback) {

    setTimeout(function() {
        value++;
        callback(value);
    }, 500);

}