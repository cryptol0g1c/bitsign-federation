const Escrow = artifacts.require('Escrow');
const BigNumber = require('bignumber.js');
const Promise = require('bluebird');
const utils = require('./utils/index');
const Web3 = require('web3');

const arbiter = utils.addresses[0];
const seller = utils.addresses[1];
const buyer = utils.addresses[2];
const endTime = 0;

contract('Escrow', accounts => {
  let instance;
  let value = Web3.utils.toWei(1, 'ether');
  let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  let initialSellerBalance;
  let initialBuyerBalance;
  let initialArbiterBalance;

  before(done => {
    Promise.all([
      web3.eth.getBalance(seller.address),
      web3.eth.getBalance(buyer.address),
      web3.eth.getBalance(arbiter.address)
    ]).then(([b1, b2, b3]) => {
      initialSellerBalance = Number(b1);
      initialBuyerBalance = Number(b2);
      initialArbiterBalance = Number(b3);
      done()
    });
  })

  beforeEach(done => {
    Escrow.new(seller.address, buyer.address, endTime, {value, from: arbiter.address})
      .then(contract => {
        instance = contract;
        done();
      });
  });

  it('should set variables', () => {
    return Promise.all([
      instance.arbiter(),
      instance.buyer(),
      instance.endTime(),
      instance.seller(),
      instance.value()
    ]).then(([
      _arbiter,
      _buyer,
      _endTime,
      _seller,
      _value
    ]) => {
      assert.equal(_endTime, endTime);
      assert.equal(_value, value);
      utils.assertAddress(_arbiter, arbiter.address);
      utils.assertAddress(_seller, seller.address);
      utils.assertAddress(_buyer, buyer.address);
    });
  });

  it('should pay to seller on pay() if sender is buyer', () => {
    return Promise.all([
      instance.pay({from: buyer.address}),
      instance.getBalance(),
      web3.eth.getBalance(seller.address)
    ]).then(([tx, contractBalance, sellerBalance]) => {
      assert.equal(contractBalance.toNumber(), 0);
      assert.equal(Number(sellerBalance), initialSellerBalance + Number(value));
    });
  });

  it('should pay to seller on pay() if sender is arbiter', () => {
    return Promise.all([
      instance.pay({from: arbiter.address}),
      instance.getBalance(),
      web3.eth.getBalance(seller.address)
    ]).then(([tx, contractBalance, sellerBalance]) => {
      assert.equal(contractBalance.toNumber(), 0);
      assert.equal(Number(sellerBalance), initialSellerBalance + Number(value));
    });
  });

  it('should not pay to seller on pay() if sender is not arbiter or buyer', () => {
    return Promise.all([
      instance.pay({from: seller.address}),
      instance.getBalance(),
      web3.eth.getBalance(seller.address)
    ]).then(([tx, contractBalance, sellerBalance]) => {
      assert.equal(contractBalance.toNumber(), value);
      assert.equal(Number(sellerBalance), initialSellerBalance);
    });
  });

  it('should send Payout event on pay()', () => {
    return instance.pay({from: arbiter.address})
      .then(() => utils.assertEvent(instance, {
        event: 'Payout',
        logIndex: 0,
        args: {
          _value: new BigNumber(value),
          _to: seller.address
        }
      })
    );
  });

  it('should pay to buyer on refund() if sender is seller', () => {
    return Promise.all([
      instance.refund({from: seller.address}),
      instance.getBalance(),
      web3.eth.getBalance(buyer.address)
    ]).then(([tx, contractBalance, buyerBalance]) => {
      assert.equal(contractBalance.toNumber(), 0);
      assert.equal(Number(buyerBalance), initialBuyerBalance + Number(value));
    });
  });

  it('should pay to buyer on refund() if sender is arbiter', () => {
    return Promise.all([
      instance.refund({from: arbiter.address}),
      instance.getBalance(),
      web3.eth.getBalance(buyer.address)
    ]).then(([tx, contractBalance, buyerBalance]) => {
      assert.equal(contractBalance.toNumber(), 0);
      assert.equal(Number(buyerBalance), initialBuyerBalance + Number(value));
    });
  });

  it('should not pay to buyer on refund() if sender is not arbiter or seller', () => {
    return Promise.all([
      instance.refund({from: buyer.address}),
      instance.getBalance(),
      web3.eth.getBalance(buyer.address)
    ]).then(([tx, contractBalance, buyerBalance]) => {
      assert.equal(contractBalance.toNumber(), value);
      assert.equal(Number(buyerBalance), initialBuyerBalance);
    });
  });

  it('should send Refund event on refund()', () => {
    return instance.refund({from: arbiter.address})
      .then(() => utils.assertEvent(instance, {
        event: 'Refund',
        logIndex: 0,
        args: {
          _value: new BigNumber(value),
          _to: buyer.address
        }
      })
    );
  });

  it('should get contract\'s balance on getBalance()', () => {
    return instance.getBalance()
      .then(balance => {
        assert.equal(balance, value);
      });
  });

  it('should selfdestruct on kill() if sender is arbiter', () => {
    return Promise.all([
      instance.kill({from: arbiter.address}),
      instance.getBalance(),
      web3.eth.getBalance(arbiter.address)
    ]).then(([tx, contractBalance, arbiterBalance]) => {
      assert.equal(contractBalance.toNumber(), 0);
      assert.equal(Number(arbiterBalance), initialArbiterBalance + Number(value));
    })
  });

  it('should not selfdestruct on kill() if sender is not arbiter', () => {
    return Promise.all([
      instance.kill({from: seller.address}),
      instance.getBalance(),
      web3.eth.getBalance(arbiter.address)
    ]).then(([tx, contractBalance, arbiterBalance]) => {
      assert.equal(contractBalance.toNumber(), value);
      assert.equal(Number(arbiterBalance), initialArbiterBalance);
    })
  });
});
