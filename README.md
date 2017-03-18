[![Build Status](https://travis-ci.org/stephanepericat/yahoo-finance.svg?branch=master)](https://travis-ci.org/stephanepericat/yahoo-finance)

# yahoo-finance

a node wrapper to call the various yahoo finance apis.

## Install

```shell
npm install yahoo-finance-data
```

## Getting started

```js
var YahooFinanceAPI = require('yahoo-finance-data');

var api = new YahooFinanceAPI();
```

<!-- ## Get Headlines

You can get news headlines for multiple tickers. -->

<!-- ```js
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
``` -->
## API

### getQuotes(symbolList)

Retrieves quote data for one or more securities.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| symbolList   | String  | the ticker list, comma-separated |

```js
api
  .getQuotes('YHOO,MSFT,AAPL')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### getHistoricalData(symbol, startDate, endDate)

Retrieves historical data for a given security.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| symbol       | String  | the ticker |
| start date   | String  | start date (2017-01-01) |
| end date     | String  | end date (2017-01-01) |

```js
api
  .getHistoricalData('AAPL', '2016-01-01', '2016-02-01')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### getDividendsHistory(symbol, startDate, endDate)

Retrieves dividends historical data for a given security.

| Param        | Type    | Desc  |
| ------------ |:-------:| :---- |
| symbol       | String  | the ticker |
| start date   | String  | start date (2016-01-01) |
| end date     | String  | end date (2016-12-31) |

```js
api
  .getDividendsHistory('AAPL', '2016-01-01', '2016-12-31')
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

<!-- ## Ticker Search

```js
api.
  ticker('Apple')
  .then(function(res) {
    console.log("TICKER ?", res.search, res.results);
  });
``` -->
