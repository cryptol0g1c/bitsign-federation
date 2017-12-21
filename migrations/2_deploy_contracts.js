const BSGTokenCrowdsale = artifacts.require('BSGTokenCrowdsale.sol');

module.exports = function(deployer) {
  let _startTime = web3.eth.getBlock('latest').timestamp + 60;
  let _endTime = _startTime + 60 * 60;
  let _rate = '1';
  let _wallet = '0x225d2622a78e1cfc73bdf39b3d21c15e47c38f78';

  console.log(_startTime, _endTime, _rate, _wallet);

  deployer.deploy(BSGTokenCrowdsale, _startTime, _endTime, _rate, _wallet).then(console.log);
};
