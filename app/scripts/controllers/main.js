'use strict';

/**
 * @ngdoc function
 * @name dexterWebclient.controller:MainCtrl
 * @description
 * # MainController
 * Controller of the dexterWebclientApp
 */
angular.module('dexterWebclient')
    .controller('MainController', function($scope, $http) {
        $scope.output = {};
        var url = 'http://snapdev.de:8080/dexter-webapp/api/jsonp/annotate';

        $scope.sliderValue = 0.5;
        $scope.number = 50;

        $scope.empty = function() {
            $scope.input = '';
        };

        $scope.submit = function() {

            var config = {
                params: {
                    text: $scope.input,
                    'min-conf': $scope.sliderValue,
                    n: $scope.number,
                    wn: true,
                    callback: 'JSON_CALLBACK'
                },
            };

            $http.jsonp(url, config)
                .success(function(data) {
                    if ($scope.output) {
                    	$scope.output = '';
                        $scope.output = data;
                    }
                });
        };
    });
