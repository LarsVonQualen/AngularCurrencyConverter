'use strict';
/* global _ */
/**
 * @ngdoc function
 * @name angularCurrencyConverterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCurrencyConverterApp
 */
angular.module('angularCurrencyConverterApp')
  .controller('MainController', function ($scope, OpenExchangeRatesService, amMoment, EnviromentConstants) {
      var vm = this;

      vm.latestRates = [];
      vm.currencies = [];
      vm.leftCurrency = null;
      vm.rightCurrency = null;
      vm.loadingCurrencies = true;
      vm.leftInput = '';
      vm.rightInput = '';

      OpenExchangeRatesService.getLatest().then(function (data) {
          vm.latestRates = data;
      });

      OpenExchangeRatesService.getCurrencies().then(function (data) {
          vm.currencies = data;

          vm.leftCurrency = _.findWhere(vm.currencies, { label: EnviromentConstants.DefaultLeftCurrency });
          vm.rightCurrency = _.findWhere(vm.currencies, { label: EnviromentConstants.DefaultRightCurrency });
          vm.loadingCurrencies = false;
      }, function () {
          vm.loadingCurrencies = false;
      });
  });
