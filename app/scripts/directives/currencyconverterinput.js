'use strict';

/**
 * @ngdoc directive
 * @name angularCurrencyConverterApp.directive:currencyConverterInput
 * @description
 * # currencyConverterInput
 */
angular.module('angularCurrencyConverterApp')
  .directive('currencyConverterInput', function () {
    return {
      templateUrl: 'views/directives/currencyconverterinput.html',
      restrict: 'E',
      scope: {
        currencies: '=',
        currency: '=',
        targetCurrency: '=',
        input: '=',
        output: '=',
        doUpdate: '='
      },
      controllerAs: 'vm',
      controller: function ($scope, OpenExchangeRatesService) {
        var vm = this;

        $scope.$watch('input', function (newValue) {
          if (newValue && $scope.doUpdate) {
            $scope.output = OpenExchangeRatesService.convert(newValue, vm.currency, $scope.targetCurrency);
          }
        });

        vm.currency = $scope.currency;
        vm.query = '';

        vm.takeFocus = function () {
          $scope.doUpdate = true;
        };

        vm.releaseFocus = function () {
          $scope.doUpdate = false;
        };

        vm.selectNewCurrency = function (currency) {
          vm.currency = currency;
          $scope.output = OpenExchangeRatesService.convert($scope.input, vm.currency, $scope.targetCurrency);
        };

        vm.queryPredicate = function (currency) {
          if (vm.query.length > 1) {
            var querys = vm.query.toLowerCase().split(" ");
            var result = querys.filter(function (q) {
              return currency.label.toLowerCase().indexOf(q) > -1 || currency.text.toLowerCase().indexOf(q) > -1;
            });

            return result.length !== 0;
          }
        };
      },
      link: function ($scope, $element) {
        $element.find('.dropdown-menu input').on('click', function (e) {
          e.stopPropagation();
        });
      }
    };
  });
