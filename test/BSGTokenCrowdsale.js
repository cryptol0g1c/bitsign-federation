const BSGTokenCrowdsale = artifacts.require('BSGTokenCrowdsale');
const BSGToken = artifacts.require('BSGToken');

const utils = require('./utils/index');
const { BigNumber } = web3;
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();
import { increaseTimeTo, duration } from 'zeppelin-solidity/test/helpers/increaseTime';
import latestTime from 'zeppelin-solidity/test/helpers/latestTime';

contract('BSGTokenCrowdsale', addresses => {
  let crowdsale;
  let token;
  let _openingTime;
  let _closingTime;

  // initial parameters
  const _rate = new BigNumber(2);
  const _wallet = addresses[0];
  const _cap = utils.toEther(20);
  
  // accounts
  const _buyer = addresses[1];
  const nonWhitelistedBuyer = addresses[2];

  beforeEach(async() => {
    _openingTime = await latestTime(web3) + duration.weeks(1);
    _closingTime = _openingTime + duration.weeks(1);

    crowdsale = await BSGTokenCrowdsale.new(
      _rate,
      _wallet,
      _cap,
      _openingTime,
      _closingTime
    );
  });

  describe('Crowdsale', () => {
    
    it('should initialize with 0 tokens', async() => {
      (await crowdsale.weiRaised()).should.bignumber.equal(0);
    });
  
    it('should add address to whitelist', async() => {
      await crowdsale.addToWhitelist(_buyer);
      (await crowdsale.whitelist(_buyer)).should.equal(true);    
    });
  });

  describe('for whiteliste\'d address and with correct startTime', () => {
    beforeEach(async() => {
      await increaseTimeTo(_openingTime);
      await crowdsale.addToWhitelist(_buyer)
    });
    
    it('should allow user to buy', async() => {
      let value = utils.toEther(10);
  
      await crowdsale.buyTokens(_buyer, {value, from: _wallet});
      (await crowdsale.balanceOf(_buyer)).should.bignumber.equal(value.times(_rate));
    });

    it('should allow user to buy if capped is not reached', async() => {
      let value = utils.toEther(10);
  
      await crowdsale.buyTokens(_buyer, {value, from: _wallet});
      await crowdsale.buyTokens(_buyer, {value, from: _wallet});
      (await crowdsale.capReached()).should.equal(true);
    });

    it('should fail when cap reached', async() => {
      let value = utils.toEther(21);
      try {
        await crowdsale.buyTokens(_buyer, {value, from: _wallet});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });

  describe('for non whiteliste\'d address', () => {
    beforeEach(async() => {
      await increaseTimeTo(_openingTime);
    });
    
    it('should revert transaction', async() => {
      let value = utils.toEther(10);

      try {
        await crowdsale.buyTokens(nonWhitelistedBuyer, {value, from: _wallet});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });

  describe('if startTime < now', () => {

    beforeEach(async() => {
      await crowdsale.addToWhitelist(_buyer)
    });
    
    it('should revert transaction', async() => {
      let value = utils.toEther(10);

      try {
        await crowdsale.buyTokens(nonWhitelistedBuyer, {value, from: _wallet});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });
  
  describe('if closingTime < now', () => {

    beforeEach(async() => {
      await crowdsale.addToWhitelist(_buyer)
    });
    
    it('should revert transaction', async() => {
      await increaseTimeTo(_closingTime + duration.minutes(1));
  
      let value = utils.toEther(10);
  
      try {
        await crowdsale.buyTokens(nonWhitelistedBuyer, {value, from: _wallet});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });
});