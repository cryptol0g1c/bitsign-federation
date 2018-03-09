import { util } from 'chai/lib/chai';

const BSGTokenCrowdsale = artifacts.require('BSGTokenCrowdsale');
const BSGToken = artifacts.require('BSGToken');
const utils = require('./utils/index');
const Web3 = require('web3');
const { BigNumber } = web3;
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('BSGTokenCrowdsale', addresses => {
  let crowdsale;
  let token;

  // initial parameters
  const _rate = new BigNumber(2);
  const _tokenSupply = utils.toEther(100);
  const _wallet = addresses[0];

  // accounts
  const buyer = addresses[1];
  const nonWhitelistedBuyer = addresses[2];

  beforeEach(async() => {
    token = await BSGToken.new();
    crowdsale = await BSGTokenCrowdsale.new(
      _rate,
      _wallet,
      token.address
    );
    await token.transfer(crowdsale.address, _tokenSupply);
  });

  describe('Token', () => {
    
    it('has the correct total supply', async() => {
      (await token.totalSupply()).should.bignumber.equal(_tokenSupply);
    });  
  });

  describe('Crowdsale', () => {
    
    it('should initialize with 0 tokens', async() => {
      (await crowdsale.weiRaised()).should.bignumber.equal(0);
    });
  
    it('should add address to whitelist', async() => {
      await crowdsale.addToWhitelist(buyer);
  
      (await crowdsale.whitelist(buyer)).should.equal(true);    
    });
  });

  describe('for whiteliste\'d address', () => {

    beforeEach(async() => await crowdsale.addToWhitelist(buyer));
    
    it('should allow user to buy', async() => {
      let value = utils.toEther(10);
  
      await crowdsale.sendTransaction({value, from: buyer});
      (await token.balanceOf(buyer)).should.bignumber.equal(value.times(_rate));
    });
  });

  describe('for non whiteliste\'d address', () => {
    
    it('should revert transaction', async() => {
      let value = utils.toEther(10);

      try {
        await crowdsale.sendTransaction({value, from: nonWhitelistedBuyer});
      } catch (error) {
        utils.assertRevert(error);
      }
    });
  });
});
