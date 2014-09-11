define(['angular'], function (angular) {
	'use strict';
	
  /* Services */

  // Demonstrate how to register services
  // In this case it is a simple value service.
  angular.module('myTestApp.services', []) // add service to the module

        .constant('version', { // not available on the config
            title: 'Leo Lanese Test',
            version: '1'
        })

        .factory('labAPIservice', function($http) {
            "use strict";

            var factory = {};

            factory.getJSON = function() {
                return $http({
                    method: 'JSONP',
                    url: 'http://api.openweathermap.org/data/2.5/weather?q=london,uk&callback=JSON_CALLBACK'
                });
            };

            return factory;
        });

});
