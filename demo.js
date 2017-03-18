import YahooFinanceAPI from './src';
import express from 'express';

const app = express();
const api = new YahooFinanceAPI();

const router = new express.Router();

router.get('/', (req, res) => {
  res.json({status: 'ok'})
});

app.use('/api', router);

app.listen(3000, () => console.log('Demo API started on http://localhost:3000/api'));
