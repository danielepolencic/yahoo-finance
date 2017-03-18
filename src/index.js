import yql from 'yql-node';
import Promise from 'bluebird';

export default class YahooFinanceAPI {
  constructor(authDetails) {
    this.yql = yql.formatAsJSON();

    this.yql.setQueryParameter({
      env: 'store://datatables.org/alltableswithkeys',
      diagnostics: true
    });
  }

  fetch(query) {
    return new Promise((resolve, reject) => {
      this.yql.execute(query, (err, res) => {
        if(err) reject(err);
        else resolve(JSON.parse(res));
      });
    });
  }

  formatSymbolList(rawList) {
    const list = rawList.split(',').map(symbol => symbol.toUpperCase()).join('","');
    return `"${list}"`;
  }

  getQuotes(rawSymbolList) {
    const list = this.formatSymbolList(rawSymbolList);
    const query = `select * from yahoo.finance.quotes where symbol in (${list})`;
    return this.fetch(query);
  }

  // getDividendsHistory(symbol, startDate, endDate) {
  //   const query = `select * from yahoo.finance.dividendhistory where symbol = "${symbol}" and startDate = "${startDate}" and endDate = "${endDate}"`;
  //   return this.fetch(query);
  // }

  getHistoricalData(symbol, startDate, endDate) {
    const query = `select * from yahoo.finance.historicaldata where symbol = "${symbol}" and startDate = "${startDate}" and endDate = "${endDate}"`;
    return this.fetch(query);
  }
}
