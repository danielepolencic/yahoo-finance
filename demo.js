import YahooFinanceAPI from './src';
import express from 'express';

const app = express();
// get api keys  here: https://developer.yahoo.com/apps/create/
const api = new YahooFinanceAPI({
  key: 'dj0yJmk9TE9NeVpMSXppS00zJmQ9WVdrOWNqaERkRkJETTJNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1lMw--',
  secret: 'b9116f3047cd82192885c43d9b86c0c0a2bbf54b'
});

const router = new express.Router();

router.get('/', (req, res) => {
  res.json({status: 'ok'})
});

/**
 * @desc realtime quote data
 * @example http://localhost:3000/api/quote/realtime/yhoo,msft,aapl
 */
router.get('/quote/realtime/:tickers', (req, res) => {
  api
    .getRealtimeQuote(req.params.tickers)
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
