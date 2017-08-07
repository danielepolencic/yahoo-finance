import {expect} from 'chai';
import sinon from 'sinon';

import YahooFinanceAPI from '../src';

describe('The Yahoo Finance Data module', () => {
  it('should export a function', () => {
    expect(YahooFinanceAPI).to.be.a('function');
  });

  it('should throw an error if no api details are passed to it', () => {
    expect(() => {
      new YahooFinanceAPI();
    }).to.throw();
  });

  it('should create a yql instance', () => {
    let API = new YahooFinanceAPI({
      key: 'somekey',
      secret: 'somesecret'
    });

    expect(API.yql).to.be.an('object');
  });

  describe('The fetch method', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.yql.execute = sinon.spy();
    });

    afterEach(() => {
      API = null;
    });

    it('should make a call to YQL', function() {
      let query = 'SELECT * from yahoo.finance';
      API.fetch(query);
      expect(API.yql.execute.calledWith(query)).to.equal(true);
    });
  });

  describe('#ajax', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });
    });

    afterEach(() => {
      API = null;
    });

    it('should make an ajax call', () => {
      const url = 'https://restcountries.eu/rest/v2/all';

      API.xhr = sinon.stub().returns(Promise.resolve(true));

      return API
        .ajax(url)
        .then((res) => {
          expect(API.xhr.called).to.equal(true);
        });
    });
  });

  describe('The formatSymbolList method', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });
    });

    afterEach(() => {
      API = null;
    });

    it('should format a list of symbols', () => {
      let list = API.formatSymbolList('yhoo,aapl,msft');
      expect(list).to.equal('"YHOO","AAPL","MSFT"');
    });
  });

  describe('The uppercaseList method', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });
    });

    afterEach(() => {
      API = null;
    });

    it('should uppercase a list of symbols', () => {
      let list = API.uppercaseList('yhoo,aapl,msft');
      expect(list).to.equal('YHOO,AAPL,MSFT');
    });
  });

  describe('The getQuotes method', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.fetch = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should call YQL to get some quote data', () => {
      return API
        .getQuotes('aapl')
        .then((res) => {
          expect(API.fetch.calledWith('select * from yahoo.finance.quotes where symbol in ("AAPL")')).to.equal(true);
        });
    });
  });

  describe('The getRealtimeQuotes method', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.fetch = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should call YQL to get some realtime quote data', () => {
      return API
        .getRealtimeQuotes('aapl')
        .then((res) => {
          expect(API.fetch.calledWith('select * from pm.finance where symbol="AAPL"')).to.equal(true);
        });
    });
  });

  describe('The getForexData method', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.fetch = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should call YQL to get some foreign exchange data', () => {
      return API
        .getForexData('EURUSD')
        .then((res) => {
          expect(API.fetch.calledWith('select * from yahoo.finance.xchange where pair in ("EURUSD")')).to.equal(true);
        });
    });
  });

  describe('The getHeadlinesByTicker method', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.fetch = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should call YQL to get some news', () => {
      return API
        .getHeadlinesByTicker('aapl')
        .then((res) => {
          expect(API.fetch.calledWith('select * from pm.finance.articles where symbol in ("AAPL")')).to.equal(true);
        });
    });
  });

  describe('The tickerSearch method', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.ajax = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should search for matching securities', () => {
      return API
        .tickerSearch('Apple Inc.')
        .then((res) => {
          expect(API.ajax.called).to.equal(true);
        });
    });
  });

  // v3 tests
  describe('#getIntradayChartData', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.ajax = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should get intraday chart data for a given security', () => {
      return API
        .getIntradayChartData('AAPL')
        .then((res) => {
          expect(API.ajax.called).to.equal(true);
        });
    });
  });

  describe('#getHistoricalData', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.ajax = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should get historical chart data for a given security', () => {
      return API
        .getHistoricalData('AAPL')
        .then((res) => {
          expect(API.ajax.called).to.equal(true);
        });
    });
  });

  describe('#quoteSummary', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.ajax = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should get company info for a given security', () => {
      return API
        .quoteSummary('AAPL')
        .then((res) => {
          expect(API.ajax.called).to.equal(true);
        });
    });
  });

  describe('#optionChain', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.ajax = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should get the option chain for a given security', () => {
      return API
        .optionChain('AAPL')
        .then((res) => {
          expect(API.ajax.called).to.equal(true);
        });
    });
  });

  describe('#recommendations', () => {
    let API;

    beforeEach(() => {
      API = new YahooFinanceAPI({
        key: 'somekey',
        secret: 'somesecret'
      });

      API.ajax = sinon.stub().returns(Promise.resolve(true));
    });

    afterEach(() => {
      API = null;
    });

    it('should get securities recommendations for a given security', () => {
      return API
        .recommendations('AAPL')
        .then((res) => {
          expect(API.ajax.called).to.equal(true);
        });
    });
  });
});
