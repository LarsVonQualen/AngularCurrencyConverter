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
  .service('OpenExchangeRatesService', function ($http, $q, EnviromentConstants, $filter) {
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
  });
