var YahooFinanceAPI = require('./build/yahoo.finance.js');

var api = new YahooFinanceAPI();

// HEADLINES
api
  .getHeadlines('AAPL,YHOO,MSFT')
  .then(function(res) {
    console.log("HEADLINES ?", res.headlines);
  });

// QUOTE
api
  .getQuote('AAPL')
  .then(function(res) {
    console.log("QUOTE ?", res.quote);
  });

// HISTORICAL DATA
api.
  getHistoricalData('AAPL', '2016-01-01', '2016-02-01')
  .then(function(res) {
    console.log("DATA ?", res.data);
  });

// TICKER
api.
  ticker('Apple')
  .then(function(res) {
    console.log("TICKER ?", res.search, res.results);
  });
