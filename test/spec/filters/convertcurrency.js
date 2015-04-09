'use strict';

describe('Filter: convertCurrency', function () {

  // load the filter's module
  beforeEach(module('angularCurrencyConverterApp'));

  // initialize a new instance of the filter before each test
  var convertCurrency;
  beforeEach(inject(function ($filter) {
    convertCurrency = $filter('convertCurrency');
  }));

  it('should return the input prefixed with "convertCurrency filter:"', function () {
    var text = 'angularjs';
    expect(convertCurrency(text)).toBe('convertCurrency filter: ' + text);
  });

});
