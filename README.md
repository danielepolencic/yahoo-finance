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
    console.log("HEADLINES ?", res[0].item);
  })
```

## Get quote

```js
api
  .getQuote('AAPL')
  .then(function(res) {
    console.log("QUOTE ?", res.query.results.quote);
  });
```
