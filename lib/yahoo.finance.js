var rp = require('request-promise');
var Promise = require('bluebird');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var util = require('util');

module.exports = (function(r) {
  var self;

  function YahooFinanceAPI() {
    self = this;

    self.endpoints = {
      feeds: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=%s&region=US&lang=en-US',
      historicalData: 'https://query.yahooapis.com/v1/public/yql?q=%s&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
      quote: 'https://query.yahooapis.com/v1/public/yql?q=%s&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
      search: 'http://d.yimg.com/aq/autoc?query=%s&region=US&lang=en-US'
    }
  }

  YahooFinanceAPI.prototype = {
    getHeadlines: function(ticker) {
      var url = util.format(self.endpoints.feeds, ticker);

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
      var query = util.format('select * from yahoo.finance.quotes where symbol in ("%s")', ticker);
      var url = util.format(self.endpoints.quote, encodeURIComponent(query));

      return new Promise(function(resolve, reject) {
        r(url, {json: true})
          .then(function(res) {
            resolve(res.query.results);
          })
          .catch(reject);
      });
    },

    getHistoricalData: function(ticker, start, end) {
      var query = util.format('select * from yahoo.finance.historicaldata where symbol = "%s" and startDate = "%s" and endDate = "%s"', ticker, start, end);
      var url = util.format(self.endpoints.historicalData, encodeURIComponent(query));

      return new Promise(function(resolve, reject) {
        r(url, {json: true})
          .then(function(res) {
            resolve({data: res.query.results.quote});
          })
          .catch(reject);
      });
    },

    ticker: function(query) {
      var url = util.format(self.endpoints.search, encodeURIComponent(query));

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
