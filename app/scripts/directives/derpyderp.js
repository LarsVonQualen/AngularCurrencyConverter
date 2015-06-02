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
