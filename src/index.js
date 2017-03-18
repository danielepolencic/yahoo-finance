import yql from 'yql-node';
import Promise from 'bluebird';

export default class YahooFinanceAPI {
  constructor(authDetails) {
    this.yql = yql.formatAsJSON().withOAuth(authDetails.key, authDetails.secret);
  }

  getRealtimeQuote(symbol) {
    const query = `select * from pm.finance where symbol="${symbol}"`;

    return new Promise((resolve, reject) => {
      this.yql.execute(query, (err, res) => {
        if(err) reject(err);
        else resolve(res);
      });
    });
  }

  getHistoricalData(symbol, startDate, endDate) {
    const query = `select * from yahoo.finance.historicaldata where symbol = "${symbol}" and startDate = "${startDate}" and endDate = "${endDate}"`;
  }
}
