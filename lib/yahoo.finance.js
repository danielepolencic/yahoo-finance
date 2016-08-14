var rp = require('request-promise');
var Promise = require('bluebird');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

module.exports = (function(r) {
  var self;

  var endpoints = {
    headlines: 'https://feeds.finance.yahoo.com/rss/2.0/headline?s='
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
    getQuote: function() {
      
    },

  };

  return YahooFinanceAPI;
})(rp);
