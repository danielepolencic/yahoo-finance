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
  api
    .getHistoricalData(req.params.ticker, req.params.start, req.params.end)
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

app.use('/api', router);

app.listen(3000);
