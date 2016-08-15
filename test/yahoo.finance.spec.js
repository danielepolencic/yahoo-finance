var expect = require('expect.js'),
    YahooFinanceAPI = require('../lib/yahoo.finance.js');

describe('The Yahoo Finance module', function() {
  this.timeout(5000);

  var api;

  beforeEach(function() {
    api = new YahooFinanceAPI();
  });

  afterEach(function() {
    api = null;
  });

  it('should have an "endpoints" object', function() {
    expect(api.endpoints).to.be.an('object');
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

  it('should be able to get the latest quote for a given ticker', function() {
    return api
      .getQuote('AAPL')
      .then(function(res) {
        expect(res.quote).to.be.an('object');
        expect(res.quote.symbol).to.equal('AAPL');
      });
  });

  it('should be able to get some headlines for a given ticker', function() {
    return api
      .getHeadlines('AAPL')
      .then(function(res) {
        expect(res.headlines).to.be.an('array');
      });
  });

  it('should be able to get some historical data for a given ticker', function() {
    return api
      .getHistoricalData('AAPL', '2016-01-01', '2016-02-01')
      .then(function(res) {
        expect(res.data).to.be.an('array');
        expect(res.data.length).to.equal(20);
      });
  });
});
