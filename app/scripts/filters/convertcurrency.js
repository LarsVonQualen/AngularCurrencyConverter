'use strict';

/**
 * @ngdoc filter
 * @name angularCurrencyConverterApp.filter:convertCurrency
 * @function
 * @description
 * # convertCurrency
 * Filter in the angularCurrencyConverterApp.
 */
angular.module('angularCurrencyConverterApp')
  .filter('convertCurrency', function (OpenExchangeRatesService) {
    return function (thisNumber, inThisCurrency, toThisCurrency) {
      return OpenExchangeRatesService.convert(thisNumber, inThisCurrency, toThisCurrency);
    };
  });
