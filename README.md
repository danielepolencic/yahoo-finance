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

```js
api
  .getHeadlines('aapl,yhoo,msft')
  .then(function(res) {
    console.log("RES ?", res);
  })
```
