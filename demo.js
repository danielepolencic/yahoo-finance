var YahooFinanceAPI = require('./build/yahoo.finance.js');

var api = new YahooFinanceAPI();

// api
//   .getHeadlines('AAPL,YHOO,MSFT')
//   .then(function(res) {
//     console.log("HEADLINES ?", res.item);
//   })

// api
//   .getQuote('AAPL')
//   .then(function(res) {
//     console.log("QUOTE ?", res.quote);
//   });

// api.
//   getHistoricalData('AAPL', '2016-01-01', '2016-02-01')
//   .then(function(res) {
//     console.log("DATA ?", res.data);
//   });


api.
  ticker('Apple')
  .then(function(res) {
    console.log("TICKER ?", res.search, res.results);
  });
