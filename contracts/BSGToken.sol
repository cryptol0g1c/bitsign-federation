pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';


contract BSGToken is MintableToken {
  string public name = 'Bitsign';
  string public symbol = 'BSG';
  uint public decimals = 2;
}
