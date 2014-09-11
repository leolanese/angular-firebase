define(['angular', 'services'], function (angular) {
	'use strict';

	/* Controllers */


    return angular.module('myTestApp.controllers', ['myTestApp.services'])

        /*
         The longhand version protects from minification because the angular
         is now looking at the strings in the array for dependency injection and strings don’t get minified:

         http://jsfiddle.net/leolanese/hykG3/
         */
        .controller('titleCtrl',['$scope', 'version' , function ($scope, v) {

            $scope.t0 = "Test - Leo Lanese";

            $scope.classVar = "bold";

            $scope.appSettings = v;

        }])

        .controller('styleCtrl',['$scope', function ($scope) {

            $scope.t100 = "Title: Test Title";

            $scope.classVar = "classvar";

        }])

        .controller('toggleclass',['$scope', function ($scope) {

            $scope.classVar = "color";

        }])

        .controller('startController', ['$scope', 'labAPIservice', function($scope, labAPIservice) {
            // Each place where controller is applied has different scope.
            $scope.nameFilter = null;
            $scope.startList = [];

            $scope.fontloader = function(){

                // multiple @fonts loader
                WebFont.load({
                    google: {
                        families: ['Roboto']
                    }
                });

            };

            Modernizr.load({
                test: Modernizr.fontface,
                yep : $scope.fontloader(),
                nope: '/path-to/old-css-attributes.css' // If NOT, load this instead
            });

            labAPIservice.getJSON($scope.id).success(function (response) {

                // Digging into the response to get the relevant JSON data
                $scope.startList = response;

                // assigning a unicque value
                $scope.driver = response.name;

                <!-- TODO: remove these, it is just 4 debugging -->
                console.log("$scope.startList", $scope.startList);
                console.log(response);
                console.log(response.name);
                console.log(response.coord.lat,response.coord.lon);
                console.log(response.weather[0].description);
                console.log(response.weather[0].icon);
                console.log(response.main.temp, response.main.temp_min, response.main.temp_max);
                console.log(response.main.pressure);
                console.log(response.main.humidity);

            });

        }])


        .controller('cityController'['$scope', function($scope, $routeParams, labAPIservice) {
            $scope.id = $routeParams.id;

            labAPIservice.getJSON($scope.id).success(function (response) {
                $scope.startList = response;

                console.log("$scope.startList", $scope.startList);

            });

        }])

        .controller('MyCtrl1', ['$scope', function($scope) {

            $scope.t1 = "This is the partial for view 1";

        }])


        .controller('MyCtrl2', ['$scope', function($scope) {

            $scope.t2 = "This is the partial for view 2";

        }])

        .controller('MyCtrl3', ['$scope', function($scope) {
            $scope.t2 = "This is the partial for view 3";

        }])


        // handling the JSONP
        .controller('JSONCtrl',['$scope', function ($scope, labAPIservice) {

            $scope.t0 = "Test - Leo Lanese";
            // include BOLD content style?

        }])


        .controller('footerController', ['$scope', function($scope) {
            $scope.f1 = { n1: 'yyyy', a1: 'YYYY' };

            $scope.f2 = { n1: 'xxxx', a1: 'XXXXX' };
        }])


});