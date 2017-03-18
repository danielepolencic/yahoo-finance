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
});
