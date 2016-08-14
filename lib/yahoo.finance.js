var rp = require('request-promise');
var Promise = require('bluebird');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

module.exports = (function(r) {
  var self;

  var endpoints = {
    headlines: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=',
    quote: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'
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
              else resolve(js.rss.channel);
            })
          })
          .catch(reject);
      });
    },

    getQuote: function(ticker) {
      var url = endpoints.quote + ticker + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
      return new Promise(function(resolve, reject) {
        r(url, {json: true})
          .then(resolve)
          .catch(reject);
      });
    },

  };

  return YahooFinanceAPI;
})(rp);
