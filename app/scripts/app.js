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
    'angularMoment',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controllerAs: 'vm',
        controller: 'MainController'

      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controllerAs: 'vm',
        controller: 'AboutController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
