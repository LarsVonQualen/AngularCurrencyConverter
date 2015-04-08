'use strict';

/**
 * @ngdoc overview
 * @name angularCurrencyConverterApp
 * @description
 * # angularCurrencyConverterApp
 *
 * Main module of the application.
 */
angular
  .module('angularCurrencyConverterApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularMoment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controllerAs: 'mainViewModel',
        controller: 'MainController'

      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
