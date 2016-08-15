var expect = require('expect.js'),
    YahooFinanceAPI = require('../lib/yahoo.finance.js');

describe('The Yahoo Finance module', function() {
  var api;

  beforeEach(function() {
    api = new YahooFinanceAPI();
  });

  afterEach(function() {
    api = null;
  });

  it('should be able to find an array of tickers for a given search term', function() {
    return api
      .ticker('Apple')
      .then(function(res) {
        expect(res.search).to.equal('Apple');
        expect(res.results).to.be.an('array');
        expect(res.results[0]).to.be.an('object');
      });
  });
});
