'use strict';

/**
 * @ngdoc service
 * @name angularCurrencyConverterApp.EnviromentConstants
 * @description
 * # EnviromentConstants
 * Constant in the angularCurrencyConverterApp.
 */
angular.module('angularCurrencyConverterApp')
  .constant('EnviromentConstants', {
      OpenExchangeRatesBaseUrl: 'http://openexchangerates.org/api/',
      OpenExchangeRatesAppId: 'ce5c79a030494d33a89c3c9b5e969078',
      DefaultLeftCurrency: 'DKK',
      DefaultRightCurrency: 'EUR'
  });
