var rp = require('request-promise');
var Promise = require('bluebird');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

module.exports = (function(r) {
  var self;

  var endpoints = {
    headlines: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=',
    industry: 'https://feeds.finance.yahoo.com/rss/2.0/industry?s=',
    quote: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22',
    historicalData: 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22',
    search: 'http://d.yimg.com/aq/autoc?query='
  }

  function YahooFinanceAPI() {
    self = this;
  }

  YahooFinanceAPI.prototype = {
    getHeadlines: function(ticker) {
      var url = endpoints.headlines + ticker + '&region=US&lang=en-US';
      return new Promise(function(resolve, reject) {
        r(url)
          .then(function(xml) {
            parser.parseString(xml, function(err, js) {
              if(err) reject(err);
              else resolve({headlines: js.rss.channel[0].item});
            })
          })
          .catch(reject);
      });
    },

    getQuote: function(ticker) {
      var url = endpoints.quote + ticker + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
      return new Promise(function(resolve, reject) {
        r(url, {json: true})
          .then(function(res) {
            resolve(res.query.results);
          })
          .catch(reject);
      });
    },

    getHistoricalData: function(ticker, start, end) {
      var url = endpoints.historicalData + ticker + '%22%20and%20startDate%20=%20%22' + start + '%22%20and%20endDate%20=%20%22' + end + '%22&diagnostics=true&env=store://datatables.org/alltableswithkeys';
      return new Promise(function(resolve, reject) {
        r(url, {json: true})
          .then(function(res) {
            resolve({data: res.query.results});
          })
          .catch(reject);
      });
    },

    ticker: function(query) {
      var url = endpoints.search + encodeURIComponent(query) + '&region=US&lang=en-US';
      return new Promise(function(resolve, reject) {
        r(url, {json: true})
          .then(function(res) {
            resolve({
              search: res.ResultSet.Query,
              results: res.ResultSet.Result || []
            });
          })
          .catch(reject);
      });
    }
  };

  return YahooFinanceAPI;
})(rp);
