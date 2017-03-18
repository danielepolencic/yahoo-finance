'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yqlNode = require('yql-node');

var _yqlNode2 = _interopRequireDefault(_yqlNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YahooFinanceAPI = function YahooFinanceAPI() {
  _classCallCheck(this, YahooFinanceAPI);

  console.log('it works', _yqlNode2.default);
};

exports.default = YahooFinanceAPI;