'use strict';

/**
 * @ngdoc filter
 * @name angularCurrencyConverterApp.filter:herpDerp
 * @function
 * @description
 * # herpDerp
 * Filter in the angularCurrencyConverterApp.
 */
angular.module('angularCurrencyConverterApp')
  .filter('herpDerp', function () {
    return function (input) {
      return 'herpDerp filter: ' + input;
    };
  });
