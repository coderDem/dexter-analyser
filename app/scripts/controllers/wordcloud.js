'use strict';

/**
 * @ngdoc function
 * @name dexterWebclient.controller:WordcloudCtrl
 * @description
 * # WordcloudCtrl
 * Controller of the dexterWebclient
 */
angular.module('dexterWebclient')
    .controller('WordcloudController', function($scope, $http, $filter, ngTableParams) {
        $scope.output = {};
        var url = 'http://snapdev.de:8080/dexter-webapp/api/jsonp/annotate';
        var result = [];
        $scope.sliderValue = 0.5;
        $scope.number = 50;
        var data = {
            "spots": []
        };
        $scope.empty = function() {
			$scope.input = '';
        };

        $scope.show = true;
        $scope.collg = 'col-lg-6';

        $scope.setTableData = function(data) {
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10, // count per page
                sorting: {
                    wikiname: 'asc' // initial sorting
                }
            }, {
                total: data.spots.length, // length of data
                getData: function($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')(data.spots, params.orderBy()) : data.spots;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                },
            });
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
                .success(function(results) {
                    data = results;
                    $scope.tableParams.reload();
                });
        };

        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            sorting: {
                wikiname: 'asc' // initial sorting
            }
        }, {
            total: data.spots.length, // length of data
            getData: function($defer, params) {
                var orderedData = params.sorting() ? $filter('orderBy')(data.spots, params.orderBy()) : data.spots;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            },
        });
    });
