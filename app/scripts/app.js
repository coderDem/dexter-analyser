'use strict';

/**
 * @ngdoc overview
 * @name DexterWebclient
 * @description
 * # DexterWebclient
 *
 * Main module of the application.
 */
angular
  .module('dexterWebclient', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap-slider',
    'ui.bootstrap',
    'ngTable',
    'ngTableExport'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .when('/wordcloud', {
        templateUrl: 'views/wordcloud.html',
        controller: 'WordcloudController'
      })
      .when('/eval', {
        templateUrl: 'views/eval.html',
        controller: 'EvalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
