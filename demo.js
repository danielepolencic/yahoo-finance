var YahooFinanceAPI = require('./build/yahoo.finance.js');

var api = new YahooFinanceAPI();

api
  .getHeadlines('aapl')
  .then(function(res) {
    console.log("RES ?", res);
  })
