const Notarize = artifacts.require('Notarize');
const utils = require('./utils/index');

contract('Notarize', addresses => {
  let hashToNotarize = '0x1131231200000000000000000000000000000000000000000000000000000000';
  let instance;

  const account = addresses[0];
  const otherAccount = addresses[1];

  beforeEach(async() => {
    instance = (await Notarize.new(account)).contract;
  });

  it('should notarize the contract if sender is the owner', async() => {
    let tx = await instance.notarize(hashToNotarize, {from: account});
    let txStatus = await web3.eth.getTransactionReceipt(tx);

    assert.equal(txStatus.logs[0].type, 'mined');
  });

  it('should return sender address on getProof', async() => {
    let tx = await instance.notarize(hashToNotarize, {from: account});

    assert.equal((await instance.getProof(hashToNotarize)), account);
  });

  it('should send Notary event', async() => {
    (await instance.notarize(hashToNotarize, {from: account}));

    utils.assertEvent(instance, {
      event: 'Notary',
      logIndex: 0,
      args: {
        _data: hashToNotarize,
        _address: account
      }
    });
  });

  it('should not notarize the contract if sender is not the owner', async() => {
    try {
      (await instance.notarize(hashToNotarize, {from: otherAccount}));
    } catch (error) {
      utils.assertRevert(error);
    }
  });
});
