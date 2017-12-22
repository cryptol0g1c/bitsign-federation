const _ = require('lodash');
const ethjs = require('ethjs-account');
const Promise = require('bluebird');
const randomstring = require('randomstring');
const Web3 = require('web3');
const assertRevert = require('zeppelin-solidity/test/helpers/assertRevert');

const assertEvent = (contract, filter) => new Promise((resolve, reject) => {
    let event = contract[filter.event]();

    event.watch();
    event.get((error, logs) => {
      let log = _.filter(logs, filter);

      if (_.isEmpty(log)) {
        throw Error(`Failed to find filtered event for ${filter.event}`);
      } else {
        resolve(log);
      }
    });
    event.stopWatching();
});

const assertAddress = (a, b) => {
  if (!(_.toLower(a) === _.toLower(b))) {
    throw Error(`${a} must be equal to ${b}`);
  }
}

const generateRandomAddress = () => ethjs.generate(randomstring.generate(50));

const addresses = [{
  address: '0x225d2622a78e1cfc73bdf39b3d21c15e47c38f78',
  privateKey: 'a62e98c5cf901608a76138a8c12ae4e80c0d1fbce0efc20c61759c72d5529fc4'
}, {
  address: '0xaa40437adbed7e88363a779ef431747358e0d47e',
  privateKey: '06f393731ce931873a98503e07f88d4dbe14eb173861be10aa1e327d67746c51'
}, {
  address: '0xfac5f029f0fd47e2375cc848790f250f958101ec',
  privateKey: 'e4fd03fd2515820c913006195b0fd245ab21925b07cf5e038405ccab3e95f7ed'
}, {
  address: '0x901fcec0b51d2a2c1f456ddc27983fd463f2e15b',
  privateKey: '31b55fe5c1b3ec22377495bc49a0dcb61e812a493e5f38e2d287dc71ed4d4cc6'
}];

module.exports = {
  addresses,
  assertAddress,
  assertEvent,
  assertRevert,
  generateRandomAddress
};
