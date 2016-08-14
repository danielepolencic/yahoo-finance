# yahoo-finance

a node wrapper to call the various yahoo finance apis

## Install

npm install yahoo-finance

## Getting started

```js
var YahooFinanceAPI = require('./build/yahoo.finance.js');

var api = new YahooFinanceAPI();
```

## Get Headlines

You can get news headlines for multiple tickers.

```js
api
  .getHeadlines('AAPL,YHOO,MSFT')
  .then(function(res) {
    console.log("HEADLINES ?", res.item);
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
