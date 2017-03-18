[![Build Status](https://travis-ci.org/stephanepericat/yahoo-finance.svg?branch=master)](https://travis-ci.org/stephanepericat/yahoo-finance)

# yahoo-finance

a node wrapper to call the various yahoo finance apis. THis module requires a Yahoo developer account and an [app key](https://developer.yahoo.com/apps/create/).

## Install

```shell
npm install yahoo-finance-data
```

## Getting started

```js
var YahooFinanceAPI = require('yahoo-finance-data');

var api = new YahooFinanceAPI();
```

## Get Headlines

You can get news headlines for multiple tickers.

```js
api
  .getHeadlines('AAPL,YHOO,MSFT')
  .then(function(res) {
    console.log("HEADLINES ?", res.headlines);
  })
```

## Get quote

```js
api
  .getQuote('AAPL')
  .then(function(res) {
    console.log("QUOTE ?", res.quote);
  });
```

## Historical Data

```js
api.
  getHistoricalData('AAPL', '2016-01-01', '2016-02-01')
  .then(function(res) {
    console.log("DATA ?", res.data);
  });
```

## Ticker Search

```js
api.
  ticker('Apple')
  .then(function(res) {
    console.log("TICKER ?", res.search, res.results);
  });
```
