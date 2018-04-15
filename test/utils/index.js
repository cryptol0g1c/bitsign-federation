const _ = require('lodash');

// TODO: Replace when https://github.com/OpenZeppelin/zeppelin-solidity/issues/775 get solved.
// import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert';
const assertRevert = error =>
  assert.isAbove(error.message.search('revert'), -1, 'Error containing "revert" must be returned');

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

const toEther = n => new web3.BigNumber(web3.toWei(n, 'ether'));

module.exports = {
  assertAddress,
  assertEvent,
  assertRevert,
  toEther
};
