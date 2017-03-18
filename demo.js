import YahooFinanceAPI from './src';
import express from 'express';

const app = express();
// get api keys  here: https://developer.yahoo.com/apps/create/
const api = new YahooFinanceAPI();

const router = new express.Router();

router.get('/', (req, res) => {
  res.json({status: 'ok'})
});

/**
 * @desc standard yahoo quote data (15 min delay)
 * @example http://localhost:3000/api/quote/info/yahoo,msft,aapl
 */
router.get('/quote/info/:tickers', (req, res) => {
  api
    .getQuotes(req.params.tickers)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc historical data
 * @example http://localhost:3000/api/quote/historical/yhoo/2017-01-01/2017-02-01
 */
router.get('/quote/historical/:ticker/:start/:end', (req, res) => {
  let {ticker, start, end} = req.params;

  api
    .getHistoricalData(ticker, start, end)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc Dividends history
 * @example http://localhost:3000/api/dividends/history/aapl/2016-01-01/2016-12-31
 */
router.get('/dividends/history/:ticker/:start/:end', (req, res) => {
  let {ticker, start, end} = req.params;

  api
    .getDividendsHistory(ticker, start, end)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc Securities by sectorid
 * @example http://localhost:3000/api/securities/bysector/812
 */
router.get('/securities/bysector/:sectorid', (req, res) => {
  api
    .getSecuritiesBySectorIndex(req.params.sectorid)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.use('/api', router);

app.listen(3000);
