// associate the Module the file location/path on the require.config() on main.js
console.log("loading app.js");

define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
    'angularAnimate'
	],

    function (angular, filters, services, directives, controllers) {
		'use strict';

		// Declare app level module which depends on filters, and services
		
		return angular.module('myTestApp', [
			'ngRoute',
            'ngAnimate',
            'myTestApp.controllers',
			'myTestApp.filters',
			'myTestApp.services',
			'myTestApp.directives'
    ]);

});