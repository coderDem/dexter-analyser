'use strict';

/**
 * @ngdoc function
 * @name dexterWebclient.controller:EvalCtrl
 * @description
 * # EvalCtrl
 * Controller of the dexterWebclient
 */
angular.module('dexterWebclient')
    .controller('EvalCtrl', function($scope, $http, $filter, ngTableParams) {
        //$scope.input = 'Input-Text';
        var url = 'http://snapdev.de:8080/dexter-webapp/api/jsonp/annotate';
        $scope.minconf = 0.5;
        $scope.linkprob = 0.5;
        $scope.number = 50;

        var data = {
            "spots": []
        };

        $scope.expextresults = []; //expextresults list with the expected results
        $scope.results = []; //list with the results

        $scope.empty = function() {
            $scope.input = '';
        };

        $scope.show = true;
        $scope.collg = 'col-lg-6';

        $scope.deleteDublicateValues = function(array) {

            $scope.noDublicate = [];
            for (var i = 0; i < array.length; i++) {
                var elem = array[i];
                if ($scope.noDublicate.indexOf(elem) == -1) {
                    $scope.noDublicate.push(elem);
                }
            };

            return $scope.noDublicate;
        }

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
                	
                	var cleandata = {
			            "spots": []
			        }; 

                    var resultlenght = results.spots.length;

                    var result = [];
                    for (var i = 0; i < resultlenght; i++) {
                    	var wikiname = results.spots[i].wikiname;
                        var minlinkprob = results.spots[i].linkProbability;
                        
                    	 if (minlinkprob >= $scope.linkprob) {
                             cleandata.spots.push(results.spots[i]);
                         }
                        for (var j = 0; j < $scope.expextresults.length; j++) {

                            if (wikiname === $scope.expextresults[j] && minlinkprob >= $scope.linkprob) {
                                result.push(wikiname);
                            }

                        };
                    };


                    var resultNoDub = $scope.deleteDublicateValues(result).length;

                    $scope.recall = resultNoDub / $scope.expextresults.length; // recall formula

                    $scope.precision = resultNoDub / cleandata.spots.length; // precision formula

                    $scope.f_measure = 2 * (($scope.recall * $scope.precision) / ($scope.recall + $scope.precision));
                    
                    data = cleandata;
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
