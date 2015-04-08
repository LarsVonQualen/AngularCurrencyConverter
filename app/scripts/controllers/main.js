'use strict';

/**
 * @ngdoc function
 * @name angularCurrencyConverterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCurrencyConverterApp
 */
angular.module('angularCurrencyConverterApp')
  .controller('MainController', function ($scope, OpenExchangeRatesService, amMoment, EnviromentConstants, $filter) {
      var vm = this;

      var convert = function (thisNumber, inThisCurrency, toThisCurrency) {
          var fromRate = _.findWhere(vm.latestRates.rates, {
              label: inThisCurrency.label
          });

          var toRate = _.findWhere(vm.latestRates.rates, {
              label: toThisCurrency.label
          });

          var thisNumberInUsDollars = thisNumber/fromRate.rate;

          return $filter("currency")(thisNumberInUsDollars*toRate.rate, "", 2);
      };

      vm.latestRates = [];
      vm.currencies = [];
      vm.leftCurrency = null;
      vm.rightCurrency = null;
      vm.loadingCurrencies = true;
      vm.leftInput = "";
      vm.rightInput = "";

      vm.selectLeftCurrency = function (currency) {
          vm.leftCurrency = currency;
          vm.rightInput = convert(vm.leftInput, vm.leftCurrency, vm.rightCurrency);
      };

      vm.selectRightCurrency = function (currency) {
          vm.rightCurrency = currency;
          vm.leftInput = convert(vm.rightInput, vm.rightCurrency, vm.leftCurrency);
      };

      $scope.$watch(function () {
          return vm.leftInput;
      }, function (newValue) {
          if (newValue) {
              vm.rightInput = convert(newValue, vm.leftCurrency, vm.rightCurrency);
          }
      });

      $scope.$watch(function () {
          return vm.rightInput;
      }, function (newValue) {
          if (newValue) {
              vm.leftInput = convert(newValue, vm.rightCurrency, vm.leftCurrency);
          }
      });

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
