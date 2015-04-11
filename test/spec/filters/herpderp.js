'use strict';

describe('Filter: herpDerp', function () {

  // load the filter's module
  beforeEach(module('angularCurrencyConverterApp'));

  // initialize a new instance of the filter before each test
  var herpDerp;
  beforeEach(inject(function ($filter) {
    herpDerp = $filter('herpDerp');
  }));

  it('should return the input prefixed with "herpDerp filter:"', function () {
    var text = 'angularjs';
    expect(herpDerp(text)).toBe('herpDerp filter: ' + text);
  });

});
