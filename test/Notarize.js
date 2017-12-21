const Notarize = artifacts.require('Notarize');
const utils = require('./utils/index');

const account = utils.addresses[0].address;
const otherAccount = '0xaa40437adbed7e88363a779ef431747358e0d47e';

contract('Notarize', accounts => {
  let hashToNotarize = '0x1131231200000000000000000000000000000000000000000000000000000000';
  let instance;

  beforeEach((done) => {
    Notarize.new(account).then(contract => {
      instance = contract;
      done();
    })
  });

  it('should notarize the contract if sender is the owner', () => {
    return instance.notarize(hashToNotarize, {from: account})
      .then(tx => assert.equal(tx.logs[0].type, 'mined'));
  });

  it('should send Notary event', () => {
    return instance.notarize(hashToNotarize, {from: account})
      .then(() => utils.assertEvent(instance, {
        event: 'Notary',
        logIndex: 0,
        args: {
          _data: hashToNotarize,
          _address: account
        }
      })
    );
  });

  it('should not notarize the contract if sender is not the owner', () => {
    // TODO: Ver como se puede testear el revert()
  });
});
