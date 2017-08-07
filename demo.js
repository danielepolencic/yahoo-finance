import YahooFinanceAPI from './src';
import express from 'express';
import apiDetails from './api_key';

const app = express();
const api = new YahooFinanceAPI(apiDetails);
const router = new express.Router();

router.get('/', (req, res) => {
  res.json({status: 'ok'});
});

/**
 * @desc Standard Yahoo! Quote data (15 min delay)
 * @example http://localhost:3000/api/quote/info/yahoo,msft,aapl
 */
router.get('/quote/info/:tickers', (req, res) => {
  api
    .getQuotes(req.params.tickers)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc Realtime Quote data
 * @example http://localhost:3000/api/quote/realtime/yhoo,aapl,msft
 */
router.get('/quote/realtime/:tickers', (req, res) => {
  api
    .getRealtimeQuotes(req.params.tickers)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc Forex data
 * @example http://localhost:3000/api/forex/eurusd,gbpusd,cadusd
 */
router.get('/forex/:exchanges', (req, res) => {
  api
    .getForexData(req.params.exchanges)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc News Headlines by ticker
 * @example http://localhost:3000/api/news/headlines/aapl
 */
router.get('/news/headlines/:ticker', (req, res) => {
  api
    .getHeadlinesByTicker(req.params.ticker)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc Ticker search
 * @example http://localhost:3000/api/ticker/search/Apple%20Inc.?region=US&lang=en-US
 */
router.get('/ticker/search/:searchterm', (req, res) => {
  api
    .tickerSearch(req.params.searchterm, req.query.region, req.query.lang)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * NEW OR UPDATED IN v3
 */

/**
 * @desc intraday chart data (UPDATED)
 * @example http://localhost:3000/api/chart/intraday/AAPL?interval=2m&prePost=true
 */
router.get('/chart/intraday/:ticker', (req, res) => {
  api
    .getIntradayChartData(req.params.ticker, req.query.interval, req.query.prePost)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc historical chart data (UPDATED)
 * @example http://localhost:3000/api/chart/historical/AAPL?interval=1d&range=1y
 */
router.get('/chart/historical/:ticker', (req, res) => {
  api
    .getHistoricalData(req.params.ticker, req.query.interval, req.query.range)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

/**
 * @desc company info
 * @example http://localhost:3000/api/ticker/info/AAPL
 */
router.get('/ticker/info/:ticker', (req, res) => {
 api
   .quoteSummary(req.params.ticker)
   .then(data => res.json(data))
   .catch(err => res.json(err));
});

app.use('/api', router);

app.listen(3000);
