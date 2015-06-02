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
  .config(["$routeProvider", function ($routeProvider) {
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
  }]);

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
  .controller('MainController', ["$scope", "OpenExchangeRatesService", "amMoment", "EnviromentConstants", function ($scope, OpenExchangeRatesService, amMoment, EnviromentConstants) {
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
  }]);

'use strict';

/**
 * @ngdoc function
 * @name angularCurrencyConverterApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularCurrencyConverterApp
 */
angular.module('angularCurrencyConverterApp')
  .controller('AboutController', function () {

  });

'use strict';
/* global _ */
/**
 * @ngdoc service
 * @name angularCurrencyConverterApp.OpenExchangeRatesService
 * @description
 * # OpenExchangeRatesService
 * Service in the angularCurrencyConverterApp.
 */
angular.module('angularCurrencyConverterApp')
  .service('OpenExchangeRatesService', ["$http", "$q", "EnviromentConstants", "$filter", function ($http, $q, EnviromentConstants, $filter) {
    var cache = {
        latest: null,
        currencies: null
    };

    var buildUrl = function (endpoint) {
        return [EnviromentConstants.OpenExchangeRatesBaseUrl, endpoint, '.json?app_id=', EnviromentConstants.OpenExchangeRatesAppId].join('');
    };

    this.getLatest = function () {
        return $q(function (resolve, reject) {
            if (cache.latest === null) {
                $http.get(buildUrl('latest')).success(function (data) {
                    var asArray = [];

                    _.forIn(data.rates, function (value, key) {
                        asArray.push({
                            label: key,
                            rate: value
                        });
                    });

                    data.rates = asArray;

                    cache.latest = data;
                    resolve(cache.latest);
                }).error(reject);
            } else {
                resolve(cache.latest);
            }
        });
    };

    this.getCurrencies = function () {
        return $q(function (resolve, reject) {
            if (cache.currencies === null) {
                $http.get(buildUrl('currencies')).success(function (data) {
                    var asArray = [];

                    _.forIn(data, function (value, key) {
                        asArray.push({
                            label: key,
                            text: value
                        });
                    });

                    cache.currencies = asArray;
                    resolve(cache.currencies);
                }).error(reject);
            } else {
                resolve(cache.currencies);
            }
        });
    };

    this.convert = function (thisNumber, inThisCurrency, toThisCurrency) {
        var fromRate = _.findWhere(cache.latest.rates, {
            label: inThisCurrency.label
        });

        var toRate = _.findWhere(cache.latest.rates, {
            label: toThisCurrency.label
        });

        var thisNumberInUsDollars = thisNumber/fromRate.rate;

        return $filter('currency')(thisNumberInUsDollars*toRate.rate, '', 2);
    };
  }]);

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
        tabIndex: '='
      },
      controllerAs: 'vm',
      controller: ["$scope", "$filter", function ($scope, $filter) {
        var vm = this, hasFocus = false;

        vm.query = '';
        vm.currenciesSearchResult = [];

        vm.takeFocus = function () {
          hasFocus = true;
        };

        vm.releaseFocus = function () {
          hasFocus = false;
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
          if (newValue && hasFocus) {
            $scope.output = $filter('convertCurrency')(newValue, $scope.currency, $scope.targetCurrency);
        } else if (!newValue && hasFocus) {
            $scope.output = '';
          }
        });

        //// controllerAs based watcher - not normal
        $scope.$watch(function () {
            return vm.query;
        }, function (newValue) {
            vm.currenciesSearchResult = $filter('filter')($scope.currencies, vm.queryPredicate);
        });
      }],
      link: function ($scope, $element) {
        $element.find('.dropdown-menu input').on('click', function (e) {
          e.stopPropagation();
        });
      }
    };
  });

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
  .filter('convertCurrency', ["OpenExchangeRatesService", function (OpenExchangeRatesService) {
    return function (thisNumber, inThisCurrency, toThisCurrency) {
      return OpenExchangeRatesService.convert(thisNumber, inThisCurrency, toThisCurrency);
    };
  }]);

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

'use strict';

/**
 * @ngdoc directive
 * @name angularCurrencyConverterApp.directive:derpyDerp
 * @description
 * # derpyDerp
 */
angular.module('angularCurrencyConverterApp')
  .directive('derpyDerp', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the derpyDerp directive');
      }
    };
  });
