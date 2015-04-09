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
        doUpdate: '=',
        tabIndex: '='
      },
      controllerAs: 'vm',
      controller: function ($scope, $filter) {
        var vm = this;

        vm.query = '';
        vm.currenciesSearchResult = [];

        vm.takeFocus = function () {
          $scope.hasFocus = true;
        };

        vm.releaseFocus = function () {
          $scope.hasFocus = false;
        };

        vm.selectNewCurrency = function (currency) {
          $scope.currency = currency;

          if ($scope.output.length) {
            $scope.input = $filter('convertCurrency')($scope.output, $scope.targetCurrency, $scope.currency);
          }
        };

        vm.queryPredicate = function (currency) {
          if (vm.query.length > 1) {
            var querys = vm.query.toLowerCase().split(' ');
            var result = querys.filter(function (q) {
              return currency.label.toLowerCase().indexOf(q) > -1 || currency.text.toLowerCase().indexOf(q) > -1;
            });

            return result.length !== 0;
          }
        };

        //// Scope based watcher - normal
        $scope.$watch('input', function (newValue) {
          if (newValue && $scope.hasFocus) {
            $scope.output = $filter('convertCurrency')(newValue, $scope.currency, $scope.targetCurrency);
          } else if (!newValue && $scope.doUpdate) {
            $scope.output = '';
          }
        });

        //// controllerAs based watcher - not normal
        $scope.$watch(function () {
            return vm.query;
        }, function (newValue) {
            vm.currenciesSearchResult = $filter('filter')($scope.currencies, vm.queryPredicate);
        });
      },
      link: function ($scope, $element) {
        $element.find('.dropdown-menu input').on('click', function (e) {
          e.stopPropagation();
        });
      }
    };
  });
