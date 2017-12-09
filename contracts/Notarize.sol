/*
 Bitsign generic notarizacion contract v0.1e
*/
pragma solidity ^0.4.15;

contract Notarize {
  
  //State variables
  mapping (bytes32 => address) private proofs;
  address private owner;
  
  event Notary(bytes32 _sghash, address _address);

  /*
    Contract constructor takes _user as client Ethereum address
   */
  function Notarize(address _user) {
    owner = _user;
  }

  /* @params
    _data signed hash 
   */
  function notarize(bytes32 _data) {
    if (msg.sender != owner)
      revert();
    proofs[_data] = msg.sender;
    Notary(_data, msg.sender);
  }
}
