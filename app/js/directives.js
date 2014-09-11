define(['angular', 'services'], function(angular, services) {
	'use strict';

	angular.module('myTestApp.directives', [])

        // app-version === appVersion
		.directive('appVersion', ['version', function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
		    };

	    }])


        // <test-footer> === testFooter
        //  scope: is bind different data to the scope inside a directive, using an isolated scope has another effect.
        .directive('myCustomer', function() {
            return {
                restrict: 'E',
                scope: {
                    info: '=info'
                },
            templateUrl: 'app/templates/temp1.html'
            };
        });

});
