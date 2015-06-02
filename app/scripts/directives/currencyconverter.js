'use strict';

/**
 * @ngdoc directive
 * @name angularCurrencyConverterApp.directive:currencyConverter
 * @description
 * # currencyConverter
 */
angular.module('angularCurrencyConverterApp')
  .directive('currencyConverter', function () {
    return {
      templateUrl: 'views/directives/currencyconverter.html',
      scope: {
        currencies: '=',
        leftCurrency: '=',
        leftInput: '=',
        rightCurrency: '=',
        rightInput: '='
      },
      restrict: 'E'
    };
  });
