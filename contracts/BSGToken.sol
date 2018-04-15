pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract BSGToken is MintableToken {
  string public constant NAME = 'Bitsign';
  string public constant SYMBOL = 'BSG';
  uint256 public constant DECIMALS = 18;
}
