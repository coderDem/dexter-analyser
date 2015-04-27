'use strict';

/**
 * @ngdoc function
 * @name dexterWebclient.controller:TabsCtrl
 * @description
 * # TabsCtrl
 * Controller of the dexterWebclient
 */
angular.module('dexterWebclient')
  .controller('TabsController', function ($scope, $location) {
  $scope.tabs = [
    { title:'anotate', href:'/' },
    { title:'wordcloud', href:'/about' }
  ];
      $scope.isActive = function(route) {
        return route === $location.path();
    };
  });
