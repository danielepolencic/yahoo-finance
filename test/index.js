import {expect} from 'chai';
import sinon from 'sinon';

import YahooFinanceAPI from '../src';

describe('The Yahoo Finance Data module', () => {
  it('should export a function', () => {
    expect(YahooFinanceAPI).to.be.a('function');
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

    it('should make a call to YQL', function() {
      let query = 'SELECT * from yahoo.finance';
      API.fetch(query);
      expect(API.yql.execute.calledWith(query)).to.equal(true);
    });
  });
});
