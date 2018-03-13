pragma solidity ^0.4.18;

import './BSGToken.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol';


contract BSGTokenCrowdsale is Crowdsale, WhitelistedCrowdsale {
  function BSGTokenCrowdsale(uint256 _rate, address _wallet, StandardToken _token) public 
    Crowdsale(_rate, _wallet, _token)
    WhitelistedCrowdsale()
    {
      // Here could go further initialize validations
    }
}
