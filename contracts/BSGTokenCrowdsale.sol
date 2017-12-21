pragma solidity ^0.4.18;

import './BSGToken.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';


contract BSGTokenCrowdsale is Crowdsale {

  function BSGTokenCrowdsale (uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet) public
    Crowdsale(_startTime, _endTime, _rate, _wallet) {}

  function createTokenContract() internal returns (MintableToken) {
    return new BSGToken();
  }
}
