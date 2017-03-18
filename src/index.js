import yql from 'yql-node';
import rp from 'request-promise';
import Promise from 'bluebird';

/**
 * @class YahooFinanceAPI
 */
export default class YahooFinanceAPI {
  /**
   * @constructor
   * @param {Object} apiDetails
   * @return undefined
   */
  constructor(apiDetails) {
    if(!apiDetails) {
      throw new Error('You need to provide an API key and secret.');
    }

    this.yql = yql.formatAsJSON().withOAuth(apiDetails.key, apiDetails.secret);

    this.yql.setQueryParameter({
      env: 'store://datatables.org/alltableswithkeys',
      diagnostics: true
    });
  }

  /**
   * @method fetch
   * @desc executes a YQL query
   * @param {String} query
   * @return {Promise}
   */
  fetch(query) {
    return new Promise((resolve, reject) => {
      this.yql.execute(query, (err, res) => {
        if(err) {
          reject({error: true, message: err.message});
        }

        if(typeof res === 'object') {
          resolve(res);
        }

        try {
          const data = JSON.parse(res);
          resolve(data);
        } catch(e) {
          reject({error: true, message: e.message});
        }
      });
    });
  }

  /**
   * @method formatSymbolList
   * @desc formats a raw list of tickers to insert in a query
   * @param {String} rawList
   * @return {String}
   */
  formatSymbolList(rawList) {
    const list = rawList.split(',').map(symbol => symbol.toUpperCase()).join('","');
    return `"${list}"`;
  }

  /**
   * @method uppercaseList
   * @desc uppercases a raw list of tickers to insert in a query
   * @param {String} rawList
   * @return {String}
   */
  uppercaseList(rawList) {
    return rawList.split(',').map(s => s.toUpperCase()).join(',');
  }

  /**
   * @method getQuotes
   * @desc retrieves quote data
   * @param {String} rawSymbolList
   * @return {Promise}
   */
  getQuotes(rawSymbolList) {
    const list = this.formatSymbolList(rawSymbolList);
    const query = `select * from yahoo.finance.quotes where symbol in (${list})`;
    return this.fetch(query);
  }

  getRealtimeQuotes(rawSymbolList) {
    const list = this.uppercaseList(rawSymbolList);
    const query = `select * from pm.finance where symbol="${list}"`;
    return this.fetch(query);
  }

  getDividendsHistory(symbol, startDate, endDate) {
    const query = `select * from yahoo.finance.dividendhistory where symbol = "${symbol.toUpperCase()}" and startDate = "${startDate}" and endDate = "${endDate}"`;
    return this.fetch(query);
  }

  getHistoricalData(symbol, startDate, endDate) {
    const query = `select * from yahoo.finance.historicaldata where symbol = "${symbol.toUpperCase()}" and startDate = "${startDate}" and endDate = "${endDate}"`;
    return this.fetch(query);
  }

  getSecuritiesBySectorIndex(sectorIndex) {
    const query = `select * from yahoo.finance.industry where id="${sectorIndex}"`;
    return this.fetch(query);
  }

  getForexData(exchanges) {
    const list = this.formatSymbolList(exchanges);
    const query = `select * from yahoo.finance.xchange where pair in (${list})`;
    return this.fetch(query);
  }

  getHeadlinesByTicker(ticker) {
    const query = `select * from pm.finance.articles where symbol in ("${ticker.toUpperCase()}")`;
    return this.fetch(query);
  }

  getIntradayChartData(ticker) {
    const query = `select * from pm.finance.graphs where symbol in ("${ticker.toUpperCase()}")`;
    return this.fetch(query);
  }

  tickerSearch(searchTerm, region = 'US', lang = 'en-US') {
    const query = `http://d.yimg.com/aq/autoc?query=${encodeURIComponent(searchTerm)}&region=${region}&lang=${lang}`;
    return new Promise((resolve, reject) => {
      rp(query)
        .then(raw => {
          try {
            const data = JSON.parse(raw);
            resolve(data);
          } catch(e) {
            reject({error: true, message: e.message});
          }
        })
        .catch(err => {
          reject({error: true, message: err.message});
        });
    });
  }
}
