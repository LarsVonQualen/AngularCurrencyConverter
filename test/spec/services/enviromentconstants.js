'use strict';

describe('Service: EnviromentConstants', function () {

  // load the service's module
  beforeEach(module('angularCurrencyConverterApp'));

  // instantiate service
  var EnviromentConstants;
  beforeEach(inject(function (_EnviromentConstants_) {
    EnviromentConstants = _EnviromentConstants_;
  }));

  it('should do something', function () {
    expect(!!EnviromentConstants).toBe(true);
  });

});
