pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract BSGToken is StandardToken {
  string public constant NAME = 'Bitsign';
  string public constant SYMBOL = 'BSG';
  uint256 public constant DECIMALS = 18;
  
  uint256 public constant INITIAL_SUPPLY = 100 * (10 ** uint256(DECIMALS));

  function BSGToken() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }
}
