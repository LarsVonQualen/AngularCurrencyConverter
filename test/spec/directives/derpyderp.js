'use strict';

describe('Directive: derpyDerp', function () {

  // load the directive's module
  beforeEach(module('angularCurrencyConverterApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<derpy-derp></derpy-derp>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the derpyDerp directive');
  }));
});
