console.log("loading main.js");

require.config({

	paths: {
		'angular':        '../../bower_components/angular/angular',
		'angularRoute':   '../../bower_components/angular-route/angular-route',
		'angularAnimate': '../../bower_components/angular-animate/angular-animate',
		'angularMocks':   '../../bower_components/angular-mocks/angular-mocks',

		'text':           '../../bower_components/requirejs-text/text',
        'modernizr' :     '../../bower_components/modernizr/modernizr-custom',
        'fonts' :         '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont'
	},

	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularAnimate': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	}

});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes',
    'angularAnimate',
    'modernizr',
    'fonts'
], function(angular, app, routes) {
	'use strict';

	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
