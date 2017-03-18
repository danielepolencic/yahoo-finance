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

router.get('/quote/realtime/:symbol', (req, res) => {
  api
    .getRealtimeQuote(req.params.symbol)
    .then(quote => {
      try {
        const parsedData = JSON.parse(quote);
        res.json(parsedData);
      } catch(e) {
        res.json(e);
      }
    })
    .catch(err => res.json(err));
});

app.use('/api', router);

app.listen(3000);
