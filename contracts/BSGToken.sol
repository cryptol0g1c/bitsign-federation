pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract BSGToken is StandardToken {
  string public constant name = 'Bitsign';
  string public constant symbol = 'BSG';
  uint256 public constant decimals = 18;
  
  uint256 public constant INITIAL_SUPPLY = 100 * (10 ** uint256(decimals));

   function BSGToken() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    Transfer(0x0, msg.sender, INITIAL_SUPPLY);
  }
}
