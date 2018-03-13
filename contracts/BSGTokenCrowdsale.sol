pragma solidity ^0.4.18;

import './BSGToken.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';


contract BSGTokenCrowdsale is Crowdsale, MintedCrowdsale, WhitelistedCrowdsale, CappedCrowdsale, TimedCrowdsale {

  ERC20 public _token = new BSGToken();

  function BSGTokenCrowdsale(uint256 _rate, address _wallet, uint256 _cap, uint256 _openingTime, uint256 _closingTime) public 
    Crowdsale(_rate, _wallet, _token)
    CappedCrowdsale(_cap)
    TimedCrowdsale(_openingTime, _closingTime)
    {
      // Here could go further initialize validations
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
      return _token.balanceOf(_owner);
    }
}
