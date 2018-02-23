const Escrow = artifacts.require('Escrow');
const Promise = require('bluebird');
const utils = require('./utils/index');
const Web3 = require('web3');
const { BigNumber } = web3;
const should = require("chai")
  .use(require("chai-as-promised"))
  .use(require("chai-bignumber")(BigNumber))
  .should();

contract('Escrow', addresses => {
  let instance;
  let value = new BigNumber(Web3.utils.toWei('1', 'ether'));
  let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  let initialSellerBalance;
  let initialBuyerBalance;
  let initialArbiterBalance;

  const arbiter = addresses[0];
  const seller = addresses[1];
  const buyer = addresses[2];
  const endTime = 0;

  beforeEach(async() => {
    instance = (await Escrow.new(seller, buyer, endTime, {value, from: arbiter})).contract;
    initialSellerBalance = new BigNumber((await web3.eth.getBalance(seller)));
    initialBuyerBalance = new BigNumber((await web3.eth.getBalance(buyer)));
    initialArbiterBalance = new BigNumber((await web3.eth.getBalance(arbiter)));
  });

  it('should set variables', async() => {
    (await instance.value()).should.bignumber.equal(value);
    assert.equal(await (instance.endTime()), endTime);
    assert.equal(await (instance.arbiter()), arbiter);
    assert.equal(await (instance.seller()), seller);
    assert.equal(await (instance.buyer()), buyer);
  });

  it('should pay to seller on pay() if sender is buyer', async() => {
    (await instance.pay({from: buyer}));

    (await instance.getBalance()).should.bignumber.equal(0);
    (await web3.eth.getBalance(seller)).should.bignumber.equal(initialSellerBalance.plus(value));
  });

  it('should pay to seller on pay() if sender is arbiter', async() => {
    (await instance.pay({from: arbiter}));
    (await instance.getBalance()).should.bignumber.equal(0);
    (await web3.eth.getBalance(seller)).should.bignumber.equal(initialSellerBalance.plus(value));
  });

  it('should not pay to seller on pay() if sender is not arbiter or buyer', async() => {
    try {
      (await instance.pay({from: seller}));
    } catch (error) {
      utils.assertRevert(error);
      (await instance.getBalance()).should.bignumber.equal(value);
    }
  });

  it('should send Payout event on pay()', async() => {
    (await instance.pay({from: arbiter}));

    utils.assertEvent(instance, {
      event: 'Payout',
      logIndex: 0,
      args: {
        _value: new BigNumber(value.toString()),
        _to: seller
      }
    });
  });

  it('should pay to buyer on refund() if sender is seller', async() => {
    (await instance.refund({from: seller}));

    (await instance.getBalance()).should.bignumber.equal(0);
    (await web3.eth.getBalance(buyer)).should.bignumber.equal(initialBuyerBalance.plus(value));
  });

  it('should pay to buyer on refund() if sender is arbiter', async() => {
    (await instance.refund({from: arbiter}));

    (await instance.getBalance()).should.bignumber.equal(0);
    (await web3.eth.getBalance(buyer)).should.bignumber.equal(initialBuyerBalance.plus(value));
  });

  it('should not pay to buyer on refund() if sender is not arbiter or seller', async() => {
    try {
      instance.refund({from: buyer})
    } catch (error) {
      utils.assertRevert(error);
      (await instance.getBalance()).should.bignumber.equal(value);
    }
  });

  it('should send Refund event on refund()', async() => {
    (await instance.refund({from: arbiter}))

    utils.assertEvent(instance, {
      event: 'Refund',
      logIndex: 0,
      args: {
        _value: new BigNumber(value.toString()),
        _to: buyer
      }
    });
  });


  it('should get contract\'s balance on getBalance()', async() => {
    (await instance.getBalance()).should.bignumber.equal(value);
  });

  it('should selfdestruct on kill() if sender is arbiter', async() => {
    instance.kill({from: arbiter});

    (await instance.getBalance()).should.bignumber.equal(0);
    (await web3.eth.getBalance(arbiter)).should.bignumber.greaterThan(initialArbiterBalance);
  });

  it('should not selfdestruct on kill() if sender is not arbiter', async() => {
    try {
      (await instance.kill({from: seller}));
    } catch (error) {
      utils.assertRevert(error);
      (await instance.getBalance()).should.bignumber.equal(value);
      (await web3.eth.getBalance(arbiter)).should.bignumber.equal(initialArbiterBalance);
    }
  });
});
