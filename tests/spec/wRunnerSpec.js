// adding custom matchers
beforeEach(function () {

    var path = '';

    if (typeof window.karma === 'undefined') {
        // using for just JASMINE
        path += './spec/fixtures/'
    } else {
        // using JASMINE with KARMA
        path += '/Users/Leo/Documents/root/angular-base/tests/jasmine/spec/fixtures/';
    }

    // The default path is 'spec/javascript/fixtures' fixing path:
    jasmine.getFixtures().fixturesPath = path;

    var matchers = {
        toHaveCss2: function (css) {
            var colorToHex = function (color) {
                if (color.substr(0, 1) === '#') {
                    return color;
                }
                var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

                var red = parseInt(digits[2]);
                var green = parseInt(digits[3]);
                var blue = parseInt(digits[4]);

                var rgb = blue | (green << 8) | (red << 16);
                return digits[1] + '#' + rgb.toString(16);
            };
            var convertToHexIfRgb = function (value_to_check) {
                if (value_to_check.substr(0, 4) === 'rgb(') {
                    return colorToHex(value_to_check);
                }
                return value_to_check;
            };
            for (var prop in css) {
                var actual_prop = convertToHexIfRgb(this.actual.css(prop)).toUpperCase();
                var expected_prop = convertToHexIfRgb(css[prop]).toUpperCase();
                if (actual_prop !== expected_prop) {
                    return false;
                }
            }
            return true;
        }

    };

    this.addMatchers(matchers);
});



describe("RWD Testing carousel measures:", function () {

    // navigator or navigator.userAgent
    beforeEach(function(){
        // The default path is 'spec/javascript/fixtures' fixing path:
        var fixture = readFixtures('/Users/Leo/Documents/root/angular-base/tests/jasmine/spec/fixtures/' + 'index.html');
    });

    //jasmine.getFixtures().load('index.html');
    if (window.matchMedia('screen and (max-width:768px)').matches || navigator.userAgent.match(/iPhone/i) || (navigator.userAgent.match(/iPod/i)) ) {

        it('Testing RWD full-content functionality on SMALL environments', function () {
            var S = window.getComputedStyle(document.querySelector('.s-container'), "").getPropertyValue("height");
            expect(S).toBe('130px');
        })

    }

    if (window.matchMedia('screen and (min-width:768px)').matches || navigator.userAgent.match(/iPad/i) ){

        xit('Testing RWV full-content functionality on MEDIUM environments', function () {
            var M = window.getComputedStyle(document.querySelector('.s-container'), "").getPropertyValue("height");
            expect(M).toBe('320px');
        })

    }

});