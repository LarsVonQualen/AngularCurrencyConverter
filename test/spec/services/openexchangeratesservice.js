'use strict';

describe('Service: OpenExchangeRatesService', function () {

  // load the service's module
  beforeEach(module('angularCurrencyConverterApp'));

  // instantiate service
  var OpenExchangeRatesService;
  beforeEach(inject(function (_OpenExchangeRatesService_) {
    OpenExchangeRatesService = _OpenExchangeRatesService_;
  }));

  it('should do something', function () {
    expect(!!OpenExchangeRatesService).toBe(true);
  });

});
