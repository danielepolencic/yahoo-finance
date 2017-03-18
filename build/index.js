'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yqlNode = require('yql-node');

var _yqlNode2 = _interopRequireDefault(_yqlNode);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YahooFinanceAPI = function () {
  function YahooFinanceAPI(authDetails) {
    _classCallCheck(this, YahooFinanceAPI);

    this.yql = _yqlNode2.default.formatAsJSON();

    this.yql.setQueryParameter({
      env: 'store://datatables.org/alltableswithkeys',
      diagnostics: true
    });
  }

  _createClass(YahooFinanceAPI, [{
    key: 'fetch',
    value: function fetch(query) {
      var _this = this;

      return new _bluebird2.default(function (resolve, reject) {
        _this.yql.execute(query, function (err, res) {
          if (err) {
            reject({ error: true, message: err.message });
          }

          if ((typeof res === 'undefined' ? 'undefined' : _typeof(res)) === 'object') {
            resolve(res);
          }

          try {
            var data = JSON.parse(res);
            resolve(data);
          } catch (e) {
            reject({ error: true, message: e.message });
          }
        });
      });
    }
  }, {
    key: 'formatSymbolList',
    value: function formatSymbolList(rawList) {
      var list = rawList.split(',').map(function (symbol) {
        return symbol.toUpperCase();
      }).join('","');
      return '"' + list + '"';
    }
  }, {
    key: 'getQuotes',
    value: function getQuotes(rawSymbolList) {
      var list = this.formatSymbolList(rawSymbolList);
      var query = 'select * from yahoo.finance.quotes where symbol in (' + list + ')';
      return this.fetch(query);
    }
  }, {
    key: 'getDividendsHistory',
    value: function getDividendsHistory(symbol, startDate, endDate) {
      var query = 'select * from yahoo.finance.dividendhistory where symbol = "' + symbol.toUpperCase() + '" and startDate = "' + startDate + '" and endDate = "' + endDate + '"';
      return this.fetch(query);
    }
  }, {
    key: 'getHistoricalData',
    value: function getHistoricalData(symbol, startDate, endDate) {
      var query = 'select * from yahoo.finance.historicaldata where symbol = "' + symbol.toUpperCase() + '" and startDate = "' + startDate + '" and endDate = "' + endDate + '"';
      return this.fetch(query);
    }
  }, {
    key: 'getSecuritiesBySectorIndex',
    value: function getSecuritiesBySectorIndex(sectorIndex) {
      var query = 'select * from yahoo.finance.industry where id="' + sectorIndex + '"';
      return this.fetch(query);
    }
  }, {
    key: 'getForexData',
    value: function getForexData(exchanges) {
      var list = this.formatSymbolList(exchanges);
      var query = 'select * from yahoo.finance.xchange where pair in (' + list + ')';
      return this.fetch(query);
    }
  }]);

  return YahooFinanceAPI;
}();

exports.default = YahooFinanceAPI;