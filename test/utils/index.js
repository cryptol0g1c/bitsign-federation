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

module.exports = {
  assertAddress,
  assertEvent,
  assertRevert,
  generateRandomAddress
};
